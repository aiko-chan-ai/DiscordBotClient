// Animation logic ported from https://github.com/panding999/codex-startup-animation
"use strict";
  function vectorize(rgba, width, height) {
    const count=width*height, gray=new Float32Array(count), mag=new Float32Array(count), angle=new Uint8Array(count), edge=new Uint8Array(count);
    for(let i=0;i<count;i++)gray[i]=rgba[i*4]*.299+rgba[i*4+1]*.587+rgba[i*4+2]*.114;
    for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
      const i=y*width+x;
      const gx=-gray[i-width-1]+gray[i-width+1]-2*gray[i-1]+2*gray[i+1]-gray[i+width-1]+gray[i+width+1];
      const gy=-gray[i-width-1]-2*gray[i-width]-gray[i-width+1]+gray[i+width-1]+2*gray[i+width]+gray[i+width+1];
      mag[i]=Math.hypot(gx,gy);
      const a=(Math.atan2(gy,gx)*180/Math.PI+180)%180;
      angle[i]=a<22.5||a>=157.5?0:a<67.5?1:a<112.5?2:3;
    }
    const pairs=[[1,-1],[width+1,-width-1],[width,-width],[width-1,-width+1]];
    for(let y=2;y<height-2;y++)for(let x=2;x<width-2;x++){
      const i=y*width+x,[a,b]=pairs[angle[i]];
      if(mag[i]>32&&mag[i]>=mag[i+a]&&mag[i]>mag[i+b])edge[i]=1;
    }
    const neighbors=[-width-1,-width,-width+1,-1,1,width-1,width,width+1];
    const visited=new Uint8Array(count), paths=[];
    function walk(start){
      let current=start,previous=-1;const points=[];
      while(current>=0&&!visited[current]){
        visited[current]=1;points.push([current%width,Math.floor(current/width)]);
        let next=-1,best=-Infinity;
        for(const d of neighbors){const n=current+d;if(n<0||n>=count||!edge[n]||visited[n])continue;
          const dx=n%width-current%width,dy=Math.floor(n/width)-Math.floor(current/width);
          const score=previous<0?mag[n]:dx*(current%width-previous%width)+dy*(Math.floor(current/width)-Math.floor(previous/width));
          if(score>best){best=score;next=n;}
        }
        previous=current;current=next;
      }
      if(points.length>=8)paths.push(points.filter((_,i)=>i%2===0||i===points.length-1).map(([x,y])=>[Math.round(x*1536/width),Math.round(y*1024/height)]));
    }
    // Start at endpoints first, then trace the remaining closed loops.
    for(let i=0;i<count;i++)if(edge[i]&&!visited[i]&&neighbors.reduce((n,d)=>n+(edge[i+d]||0),0)<=1)walk(i);
    for(let i=0;i<count;i++)if(edge[i]&&!visited[i])walk(i);
    return paths.sort((a,b)=>b.length-a.length).slice(0,1200);
  }

module.exports = { vectorize };
