class Road {
	constructor({ x, width, laneCount = 3 }) {
		this.x = x
		this.width = width
		this.laneCount = laneCount

		// крайшне левое положение
		this.left = x - width / 2
		// крайшне правое положение
		this.right = x + width / 2

		// infinity = 1_000_000, т.к обычный Infinity
		// canvas отрисовать не может
		const infinity = 1_000_000
		this.top = -infinity
		this.bottom = infinity

		const topLeft = { x: this.left, y: this.top }
		const topRight = { x: this.right, y: this.top }
		const bottomLeft = { x: this.left, y: this.bottom }
		const bottomRight = { x: this.right, y: this.bottom }
		// Границы дороги
		this.borders = [
			// Можно создавать "извилистые" дороги
			// дополняя в массив массива точки изгибов
			// для колизии пересечения или создавать двойные
			// трассы добавля в this.borders новые границы
			[topLeft, bottomLeft],
			[topRight, bottomRight],
		]
	}

	// Получения X центра линии по индексу
	getLaneCenter(laneIndex) {
		// ширина дорожной полосы = ширина дороги / кол-во полос движения
		const laneWidth = this.width / this.laneCount
		return (
			/* 
        левое положение + половина ширины дороги 
        + минимум между кол-вом полос и выбранной 
        линией спавна (для того чтобы объект 
        не заспавнился за пределами дорожной линии)
        * на ширину линии
      */
			this.left +
			laneWidth / 2 +
			Math.min(laneIndex, this.laneCount - 1) * laneWidth
		)
	}

	draw(ctx) {
		ctx.lineWidth = 5
		ctx.strokeStyle = 'white'

		for (let i = 1; i <= this.laneCount - 1; i++) {
			// Вычитывает растояние между полосами учитывая их кол-во
			const x = lerp(this.left, this.right, i / this.laneCount)

			// рисуем пунктирную дорогу
			ctx.setLineDash([20, 20])
			ctx.beginPath()
			ctx.moveTo(x, this.top)
			ctx.lineTo(x, this.bottom)
			ctx.stroke()
		}
		ctx.setLineDash([])
		this.borders.forEach((border) => {
			ctx.beginPath()
			ctx.moveTo(border[0].x, border[0].y)
			ctx.lineTo(border[1].x, border[1].y)
			ctx.stroke()
		})
	}
}
