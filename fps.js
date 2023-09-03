class FramesHandle {
	constructor() {
		this.lastLoop = new Date()
	}

	fpsUpdate() {
		const currentLoop = new Date()
		// разница кадров
		this.fps = Math.round(1000 / (currentLoop - this.lastLoop))
		if (this.fps < this.minFps || !this.minFps) {
			this.minFps = this.fps
		}
		this.fpsRender()
		this.lastLoop = currentLoop
	}

	fpsRender() {
		document.querySelector('#fps').innerHTML = `FPS: ${this.fps}`
		document.querySelector('#minFps').innerHTML = `MIN FPS: ${this.minFps}`
	}
}

const FrameCounter = new FramesHandle()
