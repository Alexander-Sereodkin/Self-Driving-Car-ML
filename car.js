class Car {
	constructor({ x, y, width, height }) {
        // Параметры машинки
		this.x = x
		this.y = y
		this.width = width
		this.height = height
        // Элементы управления машинкой
        this.controls = new Controls()
	}

	draw(ctx) {
        // Отрисовка машинки с х, y по центру
		ctx.beginPath()
		ctx.rect(
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		)
        ctx.fill()
	}
}
