class Flock {
  birds = [];
  velocities = [];
  directions = []
  constructor(hmax=h, nbirds=30) {
    for(let i=0;i<nbirds;i++){
      const b = new SmallBird()
      const y = Math.floor(Math.random()*hmax)
      const x = Math.floor(Math.random()*w)-1;
      const v = b.s * 4
      const t = 0
      b.setTranslation(new Two.Vector(x,y))
      this.birds.push(b)
      this.velocities.push(v)
      this.directions.push(t)
    }
  }

  tick(){
    for(let i=0; i<this.birds.length; i++){
      const b = this.birds[i];
      const v = this.velocities[i];
      const t = this.directions[i];
      const vx = v * Math.cos(t)
      const vy = v * Math.sin(t)
      if(b.translation().x>w) {
        b.setTranslation(Two.Vector.add(b.translation(), new Two.Vector(-b.translation().x,0)));
        this.directions[i] = (0.5-Math.random())/20;
      }
      else if(b.translation().y>h*1.2) b.setTranslation(new Two.Vector(b.translation.x, -h*0.2))
      else if(b.translation().y<-h*0.2) b.setTranslation(new Two.Vector(b.translation.x, h*1.2))
      else b.setTranslation(Two.Vector.add(b.translation(), new Two.Vector(vx, vy)))
      b.tick()
      this.directions[i] += (0.5-Math.random())/40
    }
  }
}
