function generate(res=1) {
    clear();

    let size = 64;

    const width = Math.floor(preview.width / res);
    const height = Math.floor(preview.height / res);

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

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            const pixel = (x*res + imgData.width*y*res)*4

            const targetR = pixels[pixel];
            const targetG = pixels[pixel+1];
            const targetB = pixels[pixel+2];
            const targetA = pixels[pixel+3];

            const r = gen[x][y][0];
            const g = gen[x][y][1];
            const b = gen[x][y][2];

            const diff = Math.sqrt(
                Math.pow(r - targetR, 2) +
                Math.pow(g - targetG, 2) +
                Math.pow(b - targetB, 2)
            );

            if (diff > tolerance.value) {
                if (vertical.checked) add("TILE", 0, x/size, height/size - y/size, 0.0001*(i), [targetR, targetG, targetB, 2]);
                else add("TILE", 0, -x/size, 0.0001*(i), height/size - y/size, [targetR, targetG, targetB, 4]);

                if (blocks.length > maxBlocks.value*1000) {
                    generate(res+1);
                    return;
                }
                
                for (let X = x; X < Math.min(x+size, width-1); X++) {
                    for (let Y = y; Y < Math.min(y+size, height-1); Y++) {
                        gen[X][Y] = [targetR, targetG, targetB];
                    }
                }
                i++;
            }
        }
    }

    navigator.clipboard.writeText(getString());
}