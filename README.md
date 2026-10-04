# Build-a-Cat
Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre PuzzleGame.html en el navegador (o con Live Server). Usa el slider para crear el tamaño del tablero deseado y dale a "Start Game":
    Al iniciar veras una imagen desordenadada en tiles, debes usar el espacio vacio para ordenar todos los tiles y restaurar la imagen.

## Uso de IA

Una vez complete mis primeros envios de la entrega, procedi a usar la IA para corregir y adaptar mi codigo a lo que me pidio el WebI arena.
Principalmente lo use para:
adaptar el tablero de Canvas a elementos de DOM,
revision de logica para que solo se puedan mover las piezas correctas,
detectar errores funcionales en mi adaptacion del codigo antiguo como el de createBoard() y drawTiles(),
implementar el control por teclado,
y finalmente para ir a detalle en conceptos de DOM, tales como el ClassList.

Prompts principales:
    como hacemos drawTiles()?
    como hago para que cuando se cree el tablero, haga 50 movimientos legales aleatorios?

En cuanto a la parte de decisiones, la IA por alguna razon estaba enfocada en querer invertirme las columnas por las filas en el div, podras ver como en la funcion de createDivBoard la Y y la X estan invertidas en el bucle. Esto era una funcion intencial del codigo, debido a que esto se combinaba con flex-wrap, lo cual hace que las cajas se vayan colocando por filas en lugar de  columnas.

## Autopsia
1. Cambio de Canvas a elementos de DOM:
    En mi primera version funcional de este proyecto use un elemento <canvas> para mostrar el puzle y dibujar las imagenes. Sin embargo, esto no demostraba un gran dominio del DOM debido a que el propio <canvas> te permitia dibujar todo desde JavaScript y no hacia uso de lo que habiamos dado en clase. Al utilizar elementos de DOM, pude hacer que cada tile tuviera sus propias coordenadas a traves de los Dataset ademas de sus propios estilos en CSS, lo cual facilito la gestion de eventos y la parte visual de cada tile.
    Despues de esto, añadi la funcion drawTile() ya que al principio solo tenia drawTiles(), lo cual redibujaba todo el tablero y era poco optimo. Al añadir drawTile(), consegui la habilidad de actualizar solo las 2 tiles que cambiaron de posicion.
    Alternativa descartada: mantener el <canvas> y tener que redibjuar todo el tablero tras cada input. Aunque <canvas> era muy conveniente para mostrar el tablero, al final fue descartado debido a que no dejaba que uno usara elementos individuales del DOM para simplificar la gestion de todo el juego ademas de permitir la optimizacion de poder redibujar solo las tiles necesarias.
2. Cambio en los parametros de moveTile():
    Originalmente la funcion de moveTile() recibia como parametro el objeto emptyTile, y modificaba directamente sus propiedades. Aunque funcionaba correctamente, no era la opcion mas clara, ya que la funcion modificaba un objeto que recibia como parametro en vez de el propio emptyTile directamente. Asique cambie los parametros de entrada para que simplemente recibiese las coordenadas 'X' e 'Y' de la pieza que se queria mover. Asi la funcion se encargaria de actualizar directamente el emptyTile con la nueva posicion de la casilla.
    Alternativa descartada: seguir pasandole un emptyTile como parametro y modificarlo dentro de la propia funcion de moveTile().
