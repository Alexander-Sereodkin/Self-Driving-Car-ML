class Sensor {
	constructor({ car }) {
		this.car = car
		// Кол-во лучей-датчиков
		this.rayCount = 5
		// Длинна луча-датчика
		this.rayLength = 200
		// Угол распространения лучей-датчиков
		this.raySpread = Math.PI / 2
		// Массив лучей-датчиков
		this.rays = []

		this.reading = []
	}

	update(roadBorders) {
		// Вычитываем лучи
		this.#castRays()

		this.reading = []

		// Проходим наши лучи-датчики
		for (let i = 0; i < this.rays.length; i++) {
			this.reading.push(
				// И считываем их данные
				this.#getReading(this.rays[i], roadBorders)
			)
		}
	}

	// Считывание данных с датчика
	#getReading(ray, roadBorders) {
		const touches = []

		for (let i = 0; i < roadBorders.length; i++) {
			// Получаем пересечения лучей-датчиков и borders
			const touch = getIntersection(
				ray[0],
				ray[1],
				roadBorders[i][0],
				roadBorders[i][1]
			)
			if (touch) {
				touches.push(touch)
			}
		}
		// Если косаний лучей-датчиков нет
		if (touches.length === 0) return null
		// Получаем массив смешеней
		const offsets = touches.map(e=> e.offset)
		const minOffset = Math.min(...offsets)
		return touches.find(e => e.offset === minOffset)
	}

	#castRays() {
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
			let end = this.rays[i][1]
			if(this.reading[i]){
				end=this.reading[i]
			}
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = 'yellow'
			// Начало луча
			ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
			// Конец луча
			ctx.lineTo(end.x, end.y)
			ctx.stroke()



			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = 'black'
			// Начало луча
			ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y)
			// Конец луча
			ctx.lineTo(end.x, end.y)
			ctx.stroke()
		}
	}
}
