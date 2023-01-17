import * as jPalette from 'jpalette';
import _ from 'lodash'

const getHText = (words, scores, alpha=1.0)=> {
    words = ['test', 'the', 'samples']
    scores =[0.4, 0.1, 0.5]
    let colorMap = new jPalette.ColorMap(100, [
        new jPalette.Color(255, 255, 255, 255),
        new jPalette.Color(0, 255, 0, 255),
      ]);

    //   let max = 0;
      let min = 1;
      _.each(scores, sc=> {
        // sum+=sc;
        // if(max< sc) max = sc;
        if(min> sc) min = sc;
      });

      let str = ""
      _.each(words, (word, idx)=>{
        console.log(words)
        let sc = scores[idx]
        let c = colorMap.getColor( (sc-min)).rgb()
        str+=  `<span style="color:${c};"> ${word}</span>`
      })
      return str
}

export default getHText;
