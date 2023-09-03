class Sensor {
	constructor({ car }) {
		this.car = car
		// Кол-во лучей-датчиков
		this.rayCount = 4
		// Длинна луча-датчика
		this.rayLength = 200
		// Угол распространения лучей-датчиков
		this.raySpread = Math.PI / 2
		// Массив лучей-датчиков
		this.rays = []
	}

	update() {
		this.rays = []
		for (let i = 0; i < this.rayCount; i++) {
			// Угол наклона луча
			let rayAngle = lerp(
				// кол-во лучей с наклоном в право
				this.raySpread / 2,
				// кол-во лучей с наклоном в лево
				-this.raySpread / 2,
				// центр
				this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
			)
			// Учитывать в угол наклона лучей наклон машины
			rayAngle += this.car.angle

			// Начальная точка луча (кординаты машины)
			const start = {
				x: this.car.x,
				y: this.car.y,
			}
			// Конечная точка луча
			const end = {
				x: this.car.x - Math.sin(rayAngle) * this.rayLength,
				y: this.car.y - Math.cos(rayAngle) * this.rayLength,
			}
			this.rays.push([start, end])
		}
	}

	draw(ctx) {
		// Отрисовка лучей-датчиков
		for (let i = 0; i < this.rayCount; i++) {
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = 'yellow'
			// Начало луча
			ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
			// Конец луча
			ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
			ctx.stroke()
		}
	}
}
