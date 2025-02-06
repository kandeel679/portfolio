import { annotate ,annotationGroup} from 'https://unpkg.com/rough-notation?module';
// Or using unpkg
// import { annotate } from 'https://unpkg.com/rough-notation?module';

const dev = document.getElementById('dev');
const cy = document.getElementById('cy');
const cs = document.querySelector('#cs');
const googlecert = document.getElementById('googlecert');
const THMcert = document.getElementById('THMcert');;
const ctf = document.getElementById('ctf');
const internships = document.getElementById('internships');
const jobs = document.getElementById('jobs');

const a1 = annotate(cy, { type: 'underline', color: '#7842f5' });
const a2 = annotate(dev, { type: 'underline', color: '#7842f5' });
// const a3 = annotate(cs,{type:'highlight', color: '#9A73F3'});
const a3 = annotate(cs,{type:'highlight', color: '#9A73F3',multiline:false});
const a4 = annotate(googlecert, { type: 'highlight', color: '#736586' });
const a5 = annotate(THMcert, {type: 'highlight', color: '#736586'});
const a6 = annotate(ctf, { type: 'underline', color: '#7842f5' });

const a7 = annotate(internships, { type: 'box', color: '#7842f5' });

const a8 = annotate(jobs, { type: 'box', color: '#7842f5' });



const ag = annotationGroup([a1,a2,a3,a4,a5,a6,a7,a8]);
ag.show();