class SmallBird {
  t = Math.random()*30;
  tsr = 0.04;
  ts = 0.1 + this.tsr * (Math.random()-0.5);
  sr = 0.6;
  s = 1 + this.sr * (Math.random()-0.5);
  as = 0.9;
  j1l = 10 * this.s;
  j2l = 8 * this.s;
  bw = (this.j1l+this.j2l)*2*4
  bh = this.bw/2
  wo = 0.8;
  constructor(onClick=()=>{console.log("birbclick")}) {
    this.anchors = this.getVecSeq().map((v,i) => new Two.Anchor(v.x, v.y))
    this.pathL = two.makePath(this.anchors.slice(0,3), true)
    this.pathR = two.makePath(this.anchors.slice(2,5), true)
    this.pathL.translation.set(100,100);
    this.pathL.curved = true;
    this.pathL.noFill()
    this.pathL.linewidth = 2
    this.pathL.cap="round"
    this.pathR.translation.set(100,100);
    this.pathR.curved = true;
    this.pathR.noFill()
    this.pathR.linewidth = 2
    this.pathR.cap="round"

    this.box = two.makeRectangle(0,-this.bh/2, this.bw, this.bh);
    this.box.fill = 'rgba(0, 200, 255, 0.0)';
    this.box.stroke = 0

    two.update()

    this.boxelem = document.getElementById(this.box.id)

    this.boxelem.style.cursor = "pointer"
    this.boxelem.onclick = onClick
  }

  translation(){
    return this.pathL.translation
  }

  setTranslation(v){
    this.pathL.translation.set(v.x,v.y);
    this.pathR.translation.set(v.x,v.y);
    this.box.translation.set(v.x,v.y);
  }

  tick(){
    this.t += 1;
    this.getVecSeq().forEach((v,i) =>{
      this.anchors[i].x = v.x;
      this.anchors[i].y = v.y;
    })
  }

  getVecSeq(){
    const j1r = this.getJoint1();
    const j1l = new Two.Vector(-j1r.x, j1r.y);
    const j2r = Two.Vector.add(this.getJoint2(), j1r);
    const j2l = new Two.Vector(-j2r.x, j2r.y);
    const j0 = new Two.Vector(0,0);
    return [j2l, j1l, j0, j1r, j2r];
  }

  getTheta1(){
    return Math.sin(this.t * this.ts) * this.as;
  }

  getTheta2(){
    return Math.sin(this.t * this.ts - this.wo) * this.as;
  }

  getJoint1(){
    const angle = -Math.PI / 8 + this.getTheta1()
    return new Two.Vector(
      this.j1l * Math.cos(angle),
      this.j1l * Math.sin(angle)
    )
  }

  getJoint2(){
    const angle = this.getTheta2()
    return new Two.Vector(
      this.j1l * Math.cos(angle),
      this.j1l * Math.sin(angle)
    )
  }

  get
}
