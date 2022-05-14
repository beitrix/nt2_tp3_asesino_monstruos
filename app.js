new Vue({
    // Tengo el selector de elementos en el div con id #app (que es el div más elevado del index)
    el: '#app',
    //tenemos la data con algunas propiedades sugeridas
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos =[]
        },
        atacar: function () {
            var heridas = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludMonstruo -= heridas
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador golpea al monstruo por: ' + heridas
            })
            if (this.verificarGanador()){
                return
            }
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            var heridas = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= heridas
            this.turnos.unshift({
                esJugador: true,
                text: 'El jugador golpea fuertemente al monstruo por: ' + heridas
            })
            if (this.verificarGanador()){
                return
            }
            this.ataqueDelMonstruo()
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += 10
                this.turnos.unshift({
                    esJugador: true,
                    text: 'El jugador se curó en un 10%'
                })
            } else {
                this.saludJugador = 100
                this.turnos.unshift({
                    esJugador: true,
                    text: 'El jugador se curó completamente'
                })
            }
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            var heridas = this.calcularHeridas(this.rangoAtaque)
            this.saludJugador -= heridas
            this.turnos.unshift({
                esJugador: false,
                text:'El monstruo lastima al jugador por ' + heridas
            })
            this.verificarGanador()
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random()*rango[1]+1,rango[0]))

        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                if (confirm('Has ganado campeónnnnn! Vamo a juga?')){
                    this.empezarPartida()
                }else{
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            } else if (this.saludJugador <= 0){
                if (confirm('Has perdido loserrrr! Vamo a juga?')){
                    this.empezarPartida()
                }else{
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});