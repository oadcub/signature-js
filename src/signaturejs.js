(function () {
    this.Signature = function () {
        this.canvas = null;
        this.canvasContext = null;

        var defaults = {
            autoOpen: false,
            closeButton: true,
            containerId: "",
            width: 400,
            height: 200,
            color: 'black',
            lineWidth: 1
        }

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        if (this.options.autoOpen === true) this.open();
    }

    // Public Methods
    Signature.prototype.open = function () {
        buildCanvas.call(this);
    }

    Signature.prototype.clear = function () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    Signature.prototype.getDataUrl = function () {
        return this.canvas.toDataURL();
    }

    // Private Methods
    function buildCanvas() {

        // Create canvas element
        this.canvas = document.createElement("canvas");

        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.canvas.className = "signature-canvas " + this.options.className;
        this.canvas.style.width = this.options.width + "px";
        this.canvas.style.height = this.options.height + "px";

        this.canvasContext = this.canvas.getContext('2d');
        const state = {
            mousedown: false
        };
        const lineWidth = this.options.lineWidth;
        const fillStyle = this.options.color;
        const strokeStyle = this.options.color;
        const shadowColor = this.options.color;
        const shadowBlur = lineWidth / 4;

        this.canvas.addEventListener('mousedown', handleWritingStart);
        this.canvas.addEventListener('mousemove', handleWritingInProgress);
        this.canvas.addEventListener('mouseup', handleDrawingEnd);
        this.canvas.addEventListener('mouseout', handleDrawingEnd);

        this.canvas.addEventListener('touchstart', handleWritingStart);
        this.canvas.addEventListener('touchmove', handleWritingInProgress);
        this.canvas.addEventListener('touchend', handleDrawingEnd);

        const canvasContext = this.canvasContext;

        function handleWritingStart(event) {
            event.preventDefault();

            const mousePos = getMosuePositionOnCanvas(event);

            canvasContext.beginPath();

            canvasContext.moveTo(mousePos.x, mousePos.y);

            canvasContext.lineWidth = lineWidth;
            canvasContext.strokeStyle = strokeStyle;
            canvasContext.shadowColor = null;
            canvasContext.shadowBlur = null;
            canvasContext.fillStyle = fillStyle;

            canvasContext.fill();

            state.mousedown = true;
        }

        function handleWritingInProgress(event) {
            event.preventDefault();

            if (state.mousedown) {
                const mousePos = getMosuePositionOnCanvas(event);

                canvasContext.lineTo(mousePos.x, mousePos.y);
                canvasContext.stroke();
            }
        }

        function handleDrawingEnd(event) {
            event.preventDefault();

            if (state.mousedown) {
                canvasContext.shadowColor = shadowColor;
                canvasContext.shadowBlur = shadowBlur;

                canvasContext.stroke();
            }

            state.mousedown = false;
        }

        function getMosuePositionOnCanvas(event) {
            const clientX = event.clientX || event.touches[0].clientX;
            const clientY = event.clientY || event.touches[0].clientY;
            const { offsetLeft, offsetTop } = event.target;
            const canvasX = clientX - offsetLeft;
            const canvasY = clientY - offsetTop;

            return { x: canvasX, y: canvasY };
        }

        // Append canvas to container
        const container = document.getElementById(this.options.containerId);
        container.innerHTML = "";
        container.append(this.canvas);
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
}());
