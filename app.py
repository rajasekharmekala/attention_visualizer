
from flask import Flask, jsonify, request, redirect
from transformers import AutoModelForCausalLM, AutoTokenizer
import random
import logging
from functools import lru_cache
from flask_cors import CORS
import time

logger = logging.getLogger(__name__)
app = Flask(__name__, static_folder="../build", static_url_path="/snoopy")
CORS(app)


MAX_INSTANCES = 1000000000
@app.route('/attn')
def index():
    return app.send_static_file('index.html')

@app.route('/attn/get_data', methods = ['GET', 'POST'])
def get_data():
    prompt=request.args.get("text")
    model1=request.args.get("model1")
    model2=request.args.get("model2")

    print(model1, model2, prompt)

    response = {}
    tokenizer = AutoTokenizer.from_pretrained("gpt2")
    input_ids = tokenizer(prompt, return_tensors="pt").input_ids
    response['words'] = [ tokenizer._convert_id_to_token(token_id) for token_id in input_ids[0]]
    response['score1'] = getAttention(model1, input_ids)

    response['score2'] = getAttention(model2, input_ids)

    return  jsonify(response)

def getAttention(model, input_ids):
    model = get_model(model)
    result = model.generate(
        input_ids,
        do_sample=False,
        max_length=100,
        output_attentions=True,
        return_dict_in_generate=True
    )
    return result['attentions'][0][0][0][11]

# @lru_cache
def get_model(model_name):
    return AutoModelForCausalLM.from_pretrained(model_name, output_attentions=True)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)