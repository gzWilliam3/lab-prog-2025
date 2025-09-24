/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom_EDT;

/**
 *
 * @author santt
 */
public class Lista {

    // 'cabecera' apunta al primer nodo de la lista.
    // 'longitud' mantiene la cantidad de elementos en la lista.
    private Nodo cabecera;
    private int longitud;

    /**
     * Constructor de la lista. Inicializa la cabecera en null y la longitud en
     * 0.
     */
    public Lista() {
        cabecera = null;
        longitud = 0;
    }

    /**
     * Devuelve la cantidad de elementos que tiene la lista.
     *
     * @return la longitud de la lista.
     */
    public int longitud() {
        return this.longitud;
    }

    /*public int longitud() {

        int i = 0;
        Nodo aux = this.cabecera;
        while (aux.getEnlace() != null) {
            aux = aux.getEnlace();
            i++;
        }
        return i;
    }*/
    /**
     * Inserta un elemento en la posición indicada.
     *
     * @param elem Elemento a insertar.
     * @param pos Posición (1-based) donde se insertará el nuevo elemento.
     * @return true si la inserción fue exitosa, false en caso contrario.
     */
    public boolean insertar(Object elem, int pos) {

        boolean exito;

        // Se valida que la posición sea correcta: no menor a 1 ni mayor que longitud+1
        if (pos < 1 || pos > this.longitud() + 1) {
            exito = false;
        } else {
            // Caso 1: inserción en la cabecera (pos == 1)
            if (pos == 1) {
                // El nuevo nodo se convierte en la nueva cabecera
                this.cabecera = new Nodo(elem, this.cabecera);
            } else {
                // Caso 2: inserción en otra posición
                Nodo aux = this.cabecera;
                int i = 1;
                // Avanzamos hasta el nodo anterior a la posición deseada
                while (i < pos - 1) {
                    aux = aux.getEnlace();
                    i++;
                }
                // Creamos el nodo nuevo y lo encadenamos
                Nodo nuevo = new Nodo(elem, aux.getEnlace());
                aux.setEnlace(nuevo);
            }
            // Incrementamos la longitud de la lista
            this.longitud++;
            exito = true;
        }
        return exito;
    }

    /**
     * Elimina el elemento en la posición indicada.
     *
     * @param pos Posición (1-based) del elemento a eliminar.
     * @return true si se logró eliminar, false en caso de error o posición
     * inválida.
     */
    public boolean eliminar(int pos) {

        boolean exito = false;

        // Primero validamos que la lista no esté vacía y que la posición sea válida
        if (!this.esVacia() && pos >= 1 && pos <= this.longitud) {
            // Caso 1: eliminar el primer elemento (cabecera)
            if (pos == 1) {
                this.cabecera = this.cabecera.getEnlace();
            } else {
                // Caso 2: eliminar en otra posición
                Nodo aux = this.cabecera;
                int i = 1;
                // Avanzamos hasta el nodo previo al que queremos eliminar
                while (i < pos - 1) {
                    aux = aux.getEnlace();
                    i++;
                }
                // "Saltamos" el nodo a eliminar
                aux.setEnlace(aux.getEnlace().getEnlace());
            }
            // Decrementamos la longitud
            this.longitud--;
            exito = true;
        }
        return exito;
    }

    /**
     * Recupera el elemento que se encuentra en la posición indicada.
     *
     * @param pos Posición (1-based) del elemento a recuperar.
     * @return El elemento buscado o null si la posición no es válida.
     */
    public Object recuperar(int pos) {

        Object elem;
        int cant = this.longitud();

        if (pos > cant || pos < 1) {
            elem = null;
        } else {
            // Recorremos la lista hasta la posición deseada
            Nodo aux = this.cabecera;
            int i = 1;
            while (i < pos) {
                aux = aux.getEnlace();
                i++;
            }
            elem = aux.getElem();
        }

        return elem;
    }

    /**
     * Devuelve la primera posición donde se encuentra 'elem' en la lista.
     *
     * @param elem El elemento a buscar.
     * @return La posición donde está 'elem' o -1 si no está.
     */
    public int localizar(Object elem) {

        int pos = -1;
        int i = 1;
        int cant = this.longitud();
        Nodo aux = this.cabecera;

        // Recorremos la lista mientras no encontremos el elemento
        while (pos == -1 && i <= cant) {
            if (aux.getElem().equals(elem)) {
                pos = i;
            } else {
                aux = aux.getEnlace();
                i++;
            }
        }
        return pos;
    }

    /**
     * Verifica si la lista está vacía o no.
     *
     * @return true si la lista no tiene elementos, false de lo contrario.
     */
    public boolean esVacia() {
        return this.cabecera == null;
    }

    /**
     * Vacía la lista, eliminando todos los nodos.
     */
    public void vaciar() {
        this.cabecera = null;
        this.longitud = 0;
    }

    /**
     * Retorna un clon (copia superficial) de la lista.
     *
     * @return nueva Lista clonada con los mismos elementos.
     */
    @Override
    public Lista clone() {

        Lista clon = new Lista();

        // Si la lista original no está vacía, copiamos nodo por nodo
        if (!this.esVacia()) {
            Nodo aux = this.cabecera;
            // Se crea el primer nodo del clon con el elemento de la cabecera
            clon.cabecera = new Nodo(aux.getElem(), null);
            Nodo auxClon = clon.cabecera;
            clon.longitud++;
            aux = aux.getEnlace();

            // Se recorre el resto de la lista para ir creando nodos
            while (aux != null) {
                Nodo sig = new Nodo(aux.getElem(), null);
                auxClon.setEnlace(sig);
                auxClon = auxClon.getEnlace();
                aux = aux.getEnlace();
                clon.longitud++;
            }
        }

        return clon;
    }

    /**
     * Realiza un clon de la lista utilizando un método auxiliar recursivo.
     *
     * @return La nueva lista clonada.
     */
    public Lista cloneRec() {
        Lista clon = new Lista();

        if (!this.esVacia()) {
            Nodo aux = this.cabecera;
            clon.cabecera = new Nodo(aux.getElem(), null);
            clon.longitud++;
            cloneRecAux(clon, clon.cabecera, aux.getEnlace());
        }
        return clon;
    }

    /**
     * Método auxiliar recursivo para ir clonando la lista nodo a nodo.
     *
     * @param clon Lista en construcción.
     * @param nodoClon Último nodo añadido en el clon.
     * @param nodo Nodo de la lista original que estamos clonando.
     */
    private void cloneRecAux(Lista clon, Nodo nodoClon, Nodo nodo) {
        if (nodo != null) {
            Nodo nuevo = new Nodo(nodo.getElem(), null);
            clon.longitud++;
            nodoClon.setEnlace(nuevo);
            cloneRecAux(clon, nodoClon.getEnlace(), nodo.getEnlace());
        }
    }

    /**
     * Devuelve una representación en String de la lista con formato [elem1,
     * elem2, ...].
     *
     * @return Cadena con los elementos de la lista o "Lista vacia" si no tiene
     * nodos.
     */
    @Override
    public String toString() {

        String cadena;

        if (this.esVacia()) {
            cadena = "Lista vacia";
        } else {
            cadena = "[";
            Nodo aux = this.cabecera;

            // Recorremos la lista para concatenar sus elementos
            while (aux != null) {
                cadena += aux.getElem().toString();
                if (aux.getEnlace() != null) {
                    cadena += ", ";
                }
                aux = aux.getEnlace();
            }

            cadena += "]";
        }
        return cadena;
    }

    /**
     * Devuelve una nueva lista que contiene los mismos elementos pero en orden
     * inverso.
     *
     * @return lista invertida.
     */
    public Lista invertir() {
        Lista invertida = new Lista();

        if (!this.esVacia()) {
            Nodo aux = this.cabecera;
            // Llamada recursiva para armar la lista invertida
            invertirPaso(aux, invertida);
        }

        return invertida;
    }

    /**
     * Método recursivo que, a partir del nodo 'aux', agrega sus elementos a
     * 'listaInv' en orden inverso.
     *
     * @param aux Nodo actual de la lista original.
     * @param listaInv Lista donde vamos acumulando nodos en orden inverso.
     * @return El último nodo que hemos añadido a la lista invertida.
     */
    private Nodo invertirPaso(Nodo aux, Lista listaInv) {
        Nodo auxInv;

        // Caso recursivo: mientras tengamos siguiente, continuamos llamando
        if (aux.getEnlace() != null) {
            auxInv = invertirPaso(aux.getEnlace(), listaInv);
            // Creamos un nuevo nodo en la lista invertida
            Nodo sig = new Nodo(aux.getElem(), null);
            listaInv.longitud++;
            // Encadenamos
            auxInv.setEnlace(sig);
            auxInv = sig;
        } else {
            // Caso base: cuando llegamos al final (aux.getEnlace() == null),
            // creamos el primer nodo de la lista invertida
            listaInv.cabecera = new Nodo(aux.getElem(), null);
            listaInv.longitud = 1;
            auxInv = listaInv.cabecera;
        }
        return auxInv;
    }

}
