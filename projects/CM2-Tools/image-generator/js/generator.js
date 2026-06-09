const reducedID = document.getElementById("reduced");

function t(x) {
    x /= 255
    let r = (3*(1-x)**8+1)*x
    return Math.floor(r*255);
}

function generate(res=1) {
    clear();

    let reduced = 0;

    const width = Math.floor(preview.width / res);
    const height = Math.floor(preview.height / res);

    let size = 8;

    if (width*height < maxBlocks.value*250)
        size = 2;
    if (width*height < maxBlocks.value*125)
        size = 1;
    
    

    const imgData = ictx.getImageData(0, 0, width*res, height*res);
    const pixels = imgData.data;

    let gen = new Array(width);
    for (let x = 0; x < width; x++) {
        gen[x] = new Array(height);
        for (let y = 0; y < height; y++) {
            gen[x][y] = [-1000, -1000, -1000];
        }
    }

    let i = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const pixel = (x*res + imgData.width*y*res)*4

            let targetR = pixels[pixel];
            let targetG = pixels[pixel+1];
            let targetB = pixels[pixel+2];

            targetR = t(targetR);
            targetG = t(targetG);
            targetB = t(targetB);


            const r = gen[x][y][0];
            const g = gen[x][y][1];
            const b = gen[x][y][2];

            const diff = Math.sqrt(
                Math.pow(r - targetR, 2) +
                Math.pow(g - targetG, 2) +
                Math.pow(b - targetB, 2)
            );

            if (diff > tolerance.value) {
                if (vertical.checked) add("TILE", 0, x/size, (height - y - size - 1)/size, 0.0001*(i), [targetR, targetG, targetB, 2]);
                else add("TILE", 0, -x/size, 0.0001*(i), height/size - y/size, [targetR, targetG, targetB, 2]);

                if (blocks.length > maxBlocks.value*1000) {
                    generate(res+1);
                    return;
                }
                
                for (let X = x; X < Math.min(x+size, width-1); X++) {
                    for (let Y = y; Y < Math.min(y+size, height); Y++) {
                        gen[X][Y] = [targetR, targetG, targetB];
                    }
                }
                i++;
            } else {
                reduced++;
            }
        }
    }

    getString();

    reducedID.innerText = `Reduced blocks: ${reduced}`;
}