/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom_EDT;

/**
 *
 * @author santt
 */
public class Pila {

    // Atributos:
    // 'tope' apunta al nodo que está en la cima (el último elemento apilado).
    // 'cant' lleva la cuenta de la cantidad de elementos en la pila.
    private Nodo tope;
    private int cant;

    /**
     * Constructor de la pila, que inicia vacía.
     */
    public Pila() {
        this.tope = null;
        this.cant = 0;
    }

    /**
     * Retorna la cantidad de elementos en la pila (O(1)).
     *
     * @return el valor del atributo 'cant'.
     */
    public int cantElem() {
        return this.cant;
    }

    /**
     * Apila (inserta) un nuevo elemento en la cima de la pila.
     *
     * @param nuevoElem el elemento que se desea poner en la pila.
     * @return true (siempre se apila con éxito en esta implementación).
     */
    public boolean apilar(Object nuevoElem) {
        // Creamos un nuevo nodo cuyo enlace apunte al nodo actual del tope.
        Nodo nuevo = new Nodo(nuevoElem, this.tope);

        // Actualizamos el tope para que sea este nuevo nodo.
        this.tope = nuevo;
        // Incrementamos el contador de elementos.
        this.cant++;

        return true;
    }

    /**
     * Desapila (quita) el elemento que está en la cima de la pila.
     *
     * @return true si se pudo extraer el tope, false si la pila estaba vacía.
     */
    public boolean desapilar() {
        boolean exito;

        if (this.tope == null) {
            // No hay nada que desapilar.
            exito = false;
        } else {
            // Avanzamos el tope al enlace siguiente (quitamos el primero).
            this.tope = this.tope.getEnlace();
            exito = true;
            // Decrementamos el contador de elementos.
            this.cant--;
        }
        return exito;
    }

    /**
     * Devuelve el elemento que está en la cima de la pila, sin quitarlo.
     *
     * @return el elemento del tope, o null si la pila está vacía.
     */
    public Object obtenerTope() {
        Object elem;
        if (this.esVacia()) {
            elem = null;
        } else {
            elem = this.tope.getElem();
        }
        return elem;
    }

    /**
     * Verifica si la pila está vacía.
     *
     * @return true si no tiene elementos, false en caso contrario.
     */
    public boolean esVacia() {
        return this.tope == null;
    }

    /**
     * Vacía la pila, eliminando todas sus referencias a los nodos.
     */
    public void vaciar() {
        this.tope = null;
        this.cant = 0;
    }

    /**
     * Crea un clon (copia superficial) de la pila. Sin invertir el orden, es
     * decir, se copian los nodos en el mismo orden lógico de la pila.
     *
     * @return una nueva Pila que contiene los mismos elementos.
     */
    @Override
    public Pila clone() {
        Pila clon = new Pila();

        // Si la pila original no está vacía
        if (!this.esVacia()) {
            // Empezamos por el tope de la pila actual
            Nodo aux = this.tope;
            // Creamos el primer nodo para el clon
            clon.tope = new Nodo(aux.getElem(), null);

            // 'auxClon' avanza para construir la secuencia de nodos en el clon
            Nodo auxClon = clon.tope;
            // Avanzamos en la pila original
            aux = aux.getEnlace();

            while (aux != null) {
                // Creamos el siguiente nodo en el clon con el elemento de la pila original
                Nodo sig = new Nodo(aux.getElem(), null);
                auxClon.setEnlace(sig);
                auxClon = auxClon.getEnlace();

                aux = aux.getEnlace();
            }
            
            clon.cant = this.cant;
        }

        return clon;
    }

    /**
     * Devuelve un String representando los elementos de la pila. Muestra desde
     * el tope hasta el final y luego "el tope es: X".
     *
     * @return representación en cadena de la pila.
     */
    @Override
    public String toString() {
        String cadena;

        if (this.esVacia()) {
            cadena = "Pila vacia";
        } else {
            cadena = "[";
            Nodo aux = this.tope;

            // Recorremos la pila desde el tope
            while (aux != null) {
                cadena += aux.getElem().toString();
                aux = aux.getEnlace();
                if (aux != null) {
                    cadena += ", ";
                }
            }

            // Mostramos de nuevo el elemento del tope
            cadena += "] el tope es: " + this.tope.getElem().toString();
        }
        return cadena;
    }

    /**
     * Verifica si dos pilas (this y otraPila) tienen exactamente los mismos
     * elementos en el mismo orden.
     *
     * @param otraPila pila con la que comparamos
     * @return true si ambas pilas son "iguales" elemento a elemento, false de
     * lo contrario.
     */
    public boolean equals(Pila otraPila) {
        boolean iguales = true;

        // Comprobamos que no estén vacías o que ambas lo estén
        if (!this.esVacia() && !otraPila.esVacia()) {
            // Recorremos los nodos de ambas pilas simultáneamente
            Nodo aux1 = this.tope;
            Nodo aux2 = otraPila.tope;

            while (aux1 != null && aux2 != null && iguales) {
                // Si los elementos difieren, cortamos
                if (!aux1.getElem().equals(aux2.getElem())) {
                    iguales = false;
                }
                aux1 = aux1.getEnlace();
                aux2 = aux2.getEnlace();
            }
            // En este punto, si uno se terminó antes que el otro, no son iguales
            if ((aux1 != null && aux2 == null) || (aux1 == null && aux2 != null)) {
                iguales = false;
            }
        } else {
            // Si al menos una está vacía, deben estar ambas vacías para ser iguales
            iguales = this.esVacia() && otraPila.esVacia();
        }

        return iguales;
    }

    /**
     * Variante de `toString()` que usa un método recursivo para armar la cadena
     * de elementos.
     *
     * @return String con los elementos de la pila.
     */
    public String toStringRec() {
        String cadena = "Pila vacia";
        // Sólo si no está vacía aplicamos recursividad
        if (!this.esVacia()) {
            cadena = "[";
            cadena += pasoToStringRec(this.tope) + "]";
        }
        return cadena;
    }

    /**
     * Método recursivo auxiliar para construir la representación en String.
     *
     * @param aux nodo actual de la pila.
     * @return parte de la cadena con el resto de la pila.
     */
    private String pasoToStringRec(Nodo aux) {
        String nuevaCadena;
        if (aux.getEnlace() != null) {
            // Muestra el elemento del nodo actual y llama recursivamente al siguiente
            nuevaCadena = aux.getElem().toString() + ", " + pasoToStringRec(aux.getEnlace());
        } else {
            // Último nodo, sin enlace
            nuevaCadena = aux.getElem().toString();
        }
        return nuevaCadena;
    }
}
