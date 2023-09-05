class Car {
	constructor({ x, y, width, height }) {
		// Параметры машинки
		this.x = x
		this.y = y
		this.width = width
		this.height = height

		// ======= Phisichs block =======

		// Скорость
		this.speed = 0
		// Ускорение
		this.acceleration = 0.2
		// Максимальная скорость
		this.maxSpeed = 4
		// Коэффициент трения
		this.friction = 0.02
		// Угол наклона авто
		this.angle = 0

		// ==============================

		// Элементы управления машинкой
		this.sensor = new Sensor({ car: this })
		this.controls = new Controls()
	}

	update(roadBorders) {
		this.#move()
		this.sensor.update(roadBorders)
	}

	draw(ctx) {
		ctx.save()
		// отрисовка машинки по заданным координатам
		ctx.translate(this.x, this.y)
		// Поворот машинки
		ctx.rotate(-this.angle)
		ctx.beginPath()

		/*
			Отрисовка машинки, деление на два 
			нужно чтобы её координаты оказались
			в центре
		*/
		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height)
		ctx.fill()
		ctx.restore()

		// отрисовка лучей-датчиков
		this.sensor.draw(ctx)
	}

	#move() {
		// Движение вперёд
		if (this.controls.forward) {
			this.speed += this.acceleration
		}
		// Движение назад
		if (this.controls.reverse) {
			this.speed -= this.acceleration
		}

		// если скорость >0, то работает поворот
		if (this.speed !== 0) {
			const flip = this.speed > 0 ? 1 : -1
			// Движение налево
			if (this.controls.left) {
				this.angle += 0.03 * flip
			}
			// Движение направо
			if (this.controls.right) {
				this.angle -= 0.03 * flip
			}
		}

		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed
		}
		if (this.speed < -this.maxSpeed / 1.4) {
			this.speed = -this.maxSpeed / 1.4
		}

		// Постепенное снижение скорости
		if (this.speed > 0) {
			this.speed -= this.friction
		}
		if (this.speed < 0) {
			this.speed += this.friction
		}

		/*
 Если скорость чуть меньше трения
 то машинку будет дергать
 поэтому если модуль скорость < трения
 то скорость = 0
*/
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0
		}

		this.x -= Math.sin(this.angle) * this.speed
		this.y -= Math.cos(this.angle) * this.speed
	}
}
