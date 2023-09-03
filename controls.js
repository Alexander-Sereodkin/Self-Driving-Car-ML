class Controls {
	constructor() {
		this.forward = false
		this.left = false
		this.right = false
		this.reverse = false
		this.#addkeyboardListeners()
	}

	#addkeyboardListeners() {
		document.onkeydown = (event) => {
            // Keykode for independence from the user's language
			switch (event.keyCode) {
				case 87: // W - btn
				case 38: // ArrowUp - btn
					this.forward = true
					break
				case 65: // A - btn
				case 37: // ArrowLeft - btn
					this.left = true
					break
				case 68: // D - btn
				case 39: // ArrowRight - btn
					this.right = true
					break
				case 83: // S - btn
				case 40: // ArrowDown - btn
					this.reverse = true
					break
			}
		}
		document.onkeyup = (event) => {
            // Keykode for independence from the user's language
			switch (event.keyCode) {
				case 87: // W - btn
				case 38: // ArrowUp - btn
					this.forward = false
					break
				case 65: // A - btn
				case 37: // ArrowLeft - btn
					this.left = false
					break
				case 68: // D - btn
				case 39: // ArrowRight - btn
					this.right = false
					break
				case 83: // S - btn
				case 40: // ArrowDown - btn
					this.reverse = false
					break
			}
		}
	}
}
