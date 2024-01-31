import { annotate ,annotationGroup} from 'https://unpkg.com/rough-notation?module';
// Or using unpkg
// import { annotate } from 'https://unpkg.com/rough-notation?module';

const dev = document.getElementById('dev');
const front_end = document.querySelector('#frontEnd')
const back_end = document.querySelector("#backEnd")
const userF = document.querySelector('#userF');
const dev2 = document.querySelector('#dev2');
const freelance = document.querySelector('#freelance');
const cs = document.querySelector('#cs');

const a1 = annotate(dev, { type: 'box', color: '#7842f5' });
const a7 = annotate(cs,{type:'highlight', color: '#9A73F3',multiline:false});
const a2 = annotate(front_end, { type: 'highlight', color: '#8A52A1'});
const a3 = annotate(back_end, { type: 'highlight', color: '#8A52A1'});
const a4 = annotate(userF,{type:'highlight', color: '#8A52A1'});
const a5 = annotate(dev2,{type:'box', color: '#7842f5',strokeWidth:2});
const a6 = annotate(freelance,{type:'underline', color: '#7842f5',strokeWidth:2});

const ag = annotationGroup([a1,a7, a2,a3,a4,a5,a6]);
ag.show();