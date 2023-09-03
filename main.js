const canvas = document.getElementById('myCanvas')
canvas.height = window.innerHeight
canvas.window = 200

const ctx = canvas.getContext('2d')

const car = new Car({
	x: 100,
	y: 100,
	width: 30,
	height: 50,
})

car.draw(ctx)
