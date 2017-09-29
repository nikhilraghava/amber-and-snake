function Snake() {
    this.x = 100;
    this.y = 100;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = function (pos) {
        var collide = collideRectRect(this.x, this.y, scl, scl, pos.x, pos.y, scl, scl);
        if (collide) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.death = function () {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var dt = dist(this.x, this.y, pos.x, pos.y);

            if (dt < 1) {
                this.total = 0;
                this.tail = [];
                return true;
            }
        }

        // line(0, 0, width, 0); - Top
        // line(0, height, width, height); - Bottom
        // line(0, 0, 0, height); - Left
        // line(width, 0, width, height); - Right

        var topHit = collideLineRect(0, 0, width, 0, this.x, this.y, scl, scl);
        var bottomHit = collideLineRect(0, height, width, height, this.x, this.y, scl, scl);
        var leftHit = collideLineRect(0, 0, 0, height, this.x, this.y, scl, scl);
        var rightHit = collideLineRect(width, 0, width, height, this.x, this.y, scl, scl);
        
        if (topHit || bottomHit || leftHit || rightHit) {
            this.total = 0;
            this.tail = [];
            return true;
        }
    }

    this.move = function () {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function () {
        fill(255);
        noStroke();
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}
