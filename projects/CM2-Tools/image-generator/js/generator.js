function generate(res=1) {
    clear();

    let size = 10;

    const width = Math.floor(preview.width / res);
    const height = Math.floor(preview.height / res);

    const imgData = ictx.getImageData(0, 0, width*res, height*res);
    const pixels = imgData.data;

    let gen = new Array(width);
    for (let x = 0; x < width; x++) {
        gen[x] = new Array(height);
        for (let y = 0; y < height; y++) {
            gen[x][y] = [-1, -1, -1];
        }
    }

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

            if (r != targetR || g != targetG || b != targetB) {
                add("TILE", 0, x/size, height/size - y/size, 0.001*(x+y), [targetR, targetG, targetB, 2]);

                if (blocks.length > maxBlocks.value*1000) {
                    generate(res+1);
                    return;
                }
                
                for (let X = x; X < Math.min(x+size, width-1); X++) {
                    for (let Y = y; Y < Math.min(y+size, height-1); Y++) {
                        gen[X][Y] = [targetR, targetG, targetB];
                    }
                }

            }
        }
    }

    navigator.clipboard.writeText(getString());
}