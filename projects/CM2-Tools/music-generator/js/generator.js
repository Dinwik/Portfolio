async function generate() {
    let circuit = new Circuit;

    buildPiano(circuit);

    const freqs = await doSomething(input);
    buildCircuit(circuit, freqs);

    copy(circuit.getString());
}

function buildPiano(circuit) {
    for (let i = 0; i < 88; i++) {
        const note = circuit.placeBlock(Block.MUSIC, 0, 1, 1, [440 * Math.pow(2, (i-49)/12), 1]);
        const or = circuit.placeBlock(Block.OR, 0, 0, 1, [], `KEY-${i}`);
        circuit.connect(or, note);
    }
}

function buildCircuit(circuit, freqs) {
    const button = circuit.placeBlock(Block.BUTTON, 0, 0, 0);
    const tff = circuit.placeBlock(Block.TFF, 0, 0, 0, [], "", true);
    const node = circuit.placeBlock(Block.NODE, 0, 0, 0);
    let prev = circuit.placeBlock(Block.AND, 0, 0, 0);
    circuit.connect(button, prev);
    circuit.connect(prev, node);
    circuit.connect(node, tff);
    circuit.connect(tff, prev);
    for (let i = 0; i < freqs.length; i++) {
        const outs = freqs[i];
        const current = circuit.placeBlock(Block.OR, 0, 0, 1);

        for (let i = 0; i < outs.length; i++)
            circuit.connect(current, `KEY-${outs[i]}`);

        circuit.connect(prev, current);
        prev = current;
    }
    circuit.connect(prev, tff);
}

//no traube, you are not stealing this one.
async function doSomething(file){var _0xb6d16b=(529227^529228)+(718737^718744);const _0x6d3f4b=565407^565387;_0xb6d16b=451939^451937;const d=new DataView(await file['\u0061\u0072\u0072\u0061\u0079\u0042\u0075\u0066\u0066\u0065\u0072']());var _0x5248bf=(146064^146068)+(500847^500842);let p=713738^713738;_0x5248bf=(751201^751200)+(520477^520478);const _0xb4b=()=>{var _0x56e58d=(224905^224910)+(693731^693739);const v=d['\u0067\u0065\u0074\u0055\u0069\u006E\u0074\u0033\u0032'](p);_0x56e58d="cclimg";p+=335045^335041;return v;};var _0x3d_0x211=(248937^248938)+(994653^994655);const _0xd434a=()=>{const v=d['\u0067\u0065\u0074\u0055\u0069\u006E\u0074\u0031\u0036'](p);p+=318535^318533;return v;};_0x3d_0x211=(191649^191650)+(782839^782847);let _0x_0xegd;const _0xf4ece=()=>d['\u0067\u0065\u0074\u0055\u0069\u006E\u0074\u0038'](p++);_0x_0xegd=(301980^301973)+(148022^148022);let _0x2a365g;const _0x571g=()=>{let v=907734^907734,b;do{b=_0xf4ece();v=v<<(697484^697483)|b&(464792^464871);}while(b&(143404^143532));return v;};_0x2a365g='\u006C\u0069\u0061\u006B\u0063\u006A';p+=181692^181688;_0xb4b();_0xd434a();let _0x813d;const _0xf17e8a=_0xd434a();_0x813d="efikhf";var _0x85a=(534614^534623)+(622352^622359);const _0x9310c=_0xd434a();_0x85a=(729185^729186)+(604504^604507);let _0x27680f;const _0xge39be=[];_0x27680f=614754^614755;var _0xce6ce=(615169^615171)+(562179^562179);const _0x5f85d=[{"tick":0,'\u0075\u0073\u0070\u0071':500000}];_0xce6ce=(278096^278103)+(761727^761723);for(let i=227326^227326;i<_0xf17e8a;i++){p+=537908^537904;const len=_0xb4b();const _0x269e9a=p+len;let _0xd2a95f=343143^343143,_0x5fbaf=700020^700020;let _0x75e;const _0x0e84d=new Map();_0x75e=(557216^557221)+(770851^770855);while(p<_0x269e9a){_0xd2a95f+=_0x571g();let b=_0xf4ece();if(b<(387115^387243)){p--;b=_0x5fbaf;}else if(b<(340732^340492))_0x5fbaf=b;if(b===(680079^680048)){const type=_0xf4ece(),len=_0x571g();if(type===(801607^801558))_0x5f85d['\u0070\u0075\u0073\u0068']({'\u0074\u0069\u0063\u006B':_0xd2a95f,'\u0075\u0073\u0070\u0071':d['\u0067\u0065\u0074\u0055\u0069\u006E\u0074\u0038'](p)<<(843209^843225)|d['\u0067\u0065\u0074\u0055\u0069\u006E\u0074\u0038'](p+(186180^186181))<<(811032^811024)|d['\u0067\u0065\u0074\u0055\u0069\u006E\u0074\u0038'](p+(775929^775931))});p+=len;}else if(b===(328450^328690)||b===(679512^679599)){p+=_0x571g();}else{const type=b&(888944^888960),_0xfbb=b&(119528^119527);var _0xa08d=(121141^121137)+(948506^948509);const a=_0xf4ece();_0xa08d=(528313^528317)+(568972^568972);let _0x6d62f;const v=type===(621232^621168)||type===(395728^395520)?226194^226194:_0xf4ece();_0x6d62f=(106133^106134)+(445015^445008);if(_0xfbb===(364450^364459))continue;var _0x31d4g=(142880^142885)+(539346^539354);const _0x4fcgc=_0xfbb+"\u003A"+a;_0x31d4g=(337951^337945)+(288371^288372);if(type===(701917^701773)&&v>(919654^919654)){if(!_0x0e84d['\u0068\u0061\u0073'](_0x4fcgc))_0x0e84d['\u0073\u0065\u0074'](_0x4fcgc,_0xd2a95f);}else if(type===(598014^597886)||type===(787787^787931)&&v===(774052^774052)){if(_0x0e84d['\u0068\u0061\u0073'](_0x4fcgc)){_0xge39be['\u0070\u0075\u0073\u0068']({'\u006B\u0065\u0079':a-(630981^630992),'\u0073':_0x0e84d['\u0067\u0065\u0074'](_0x4fcgc),'\u0065':_0xd2a95f});_0x0e84d['\u0064\u0065\u006C\u0065\u0074\u0065'](_0x4fcgc);}}}}p=_0x269e9a;}_0x5f85d['\u0073\u006F\u0072\u0074']((a,b)=>a['\u0074\u0069\u0063\u006B']-b['\u0074\u0069\u0063\u006B']);let _0xa8161a;const _0xfc841e=tk=>{let _0xd14cef=818292^818292,_0x076c=766873^766873,_0x70ga=500000;for(const t of _0x5f85d){if(t['\u0074\u0069\u0063\u006B']>=tk)break;_0xd14cef+=(t['\u0074\u0069\u0063\u006B']-_0x076c)*_0x70ga/_0x9310c/1e6;_0x076c=t['\u0074\u0069\u0063\u006B'];_0x70ga=t['\u0075\u0073\u0070\u0071'];}return _0xd14cef+(tk-_0x076c)*_0x70ga/_0x9310c/1e6;};_0xa8161a="fkcfnf";var _0x39a=(184782^184775)+(549220^549228);const _0xb6db5f=[];_0x39a='\u006E\u006B\u0068\u0065\u0069\u0065';for(const n of _0xge39be){if(n['\u006B\u0065\u0079']<(139767^139767)||n['\u006B\u0065\u0079']>(899940^899891))continue;var _0x8b75e=(532239^532232)+(586039^586038);const s=Math['\u0072\u006F\u0075\u006E\u0064'](_0xfc841e(n['\u0073'])*_0x6d3f4b);_0x8b75e="ggbogg";const e=Math['\u006D\u0061\u0078'](s+(134663^134662),Math['\u0072\u006F\u0075\u006E\u0064'](_0xfc841e(n['\u0065'])*_0x6d3f4b));for(let t=s;t<e;t++)(_0xb6db5f[t]??=new Set())['\u0061\u0064\u0064'](n['\u006B\u0065\u0079']);}for(let t=583450^583450;t<_0xb6db5f['\u006C\u0065\u006E\u0067\u0074\u0068'];t++)_0xb6db5f[t]=_0xb6db5f[t]?[..._0xb6db5f[t]]['\u0073\u006F\u0072\u0074']((a,b)=>a-b):[];return _0xb6db5f;}