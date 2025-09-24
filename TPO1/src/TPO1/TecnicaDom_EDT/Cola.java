/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom_EDT;

/**
 *
 * @author santt
 */
public class Cola {

    // Atributos:
    // 'frente' apunta al primer nodo de la cola (el primero en salir).
    // 'fin' apunta al último nodo de la cola (donde se insertan los nuevos elementos).
    private Nodo frente;
    private Nodo fin;
    private int cantidad;

    /**
     * Constructor de la cola, inicialmente vacía.
     */
    public Cola() {
        this.fin = null;
        this.frente = null;
        this.cantidad = 0;
    }

    /**
     * Inserta un elemento al final de la cola.
     *
     * @param elem elemento a agregar.
     * @return siempre true (siempre se puede encolar en esta implementación).
     */
    public boolean poner(Object elem) {
        // Creamos un nodo con el elemento y enlace null, pues será el último
        Nodo nuevo = new Nodo(elem, null);

        // Si la cola está vacía, el nuevo nodo es tanto 'frente' como 'fin'
        if (this.esVacia()) {
            this.fin = nuevo;
            this.frente = nuevo;
        } else {
            // Enlazamos el nodo al final y actualizamos 'fin'
            this.fin.setEnlace(nuevo);
            this.fin = nuevo;
        }
        this.cantidad++;

        return true;
    }

    /**
     * Quita (desencola) el elemento que está en el frente de la cola.
     *
     * @return true si se pudo extraer, false si la cola estaba vacía.
     */
    public boolean sacar() {
        boolean exito;

        if (this.esVacia()) {
            exito = false;
        } else {
            // Avanzamos 'frente' al siguiente nodo
            this.frente = this.frente.getEnlace();

            // Si quedó vacío, 'fin' también se setea a null
            if (this.frente == null) {
                this.fin = null;
            }
            this.cantidad--;
            exito = true;
        }

        return exito;
    }

    /**
     * Verifica si la cola está vacía.
     *
     * @return true si no contiene elementos, false en caso contrario.
     */
    public boolean esVacia() {
        return this.frente == null;
    }

    /**
     * Devuelve la cantidad de elementos que tiene la cola.
     *
     * @return la longitud de la lista.
     */
    public int longitud() {
        return this.cantidad;
    }

    /**
     * Devuelve el elemento que se encuentra en el frente sin quitarlo.
     *
     * @return el elemento del frente de la cola, o null si está vacía.
     */
    public Object obtenerFrente() {
        Object elem = null;
        if (!this.esVacia()) {
            elem = this.frente.getElem();
        }
        return elem;
    }

    /**
     * Vacía por completo la cola (pierde referencia a todos los nodos).
     */
    public void vaciar() {
        this.frente = null;
        this.fin = null;
        this.cantidad = 0;
    }

    /**
     * Crea y devuelve un clon (copia superficial) de la cola actual.
     *
     * @return Nueva cola con los mismos elementos en el mismo orden.
     */
    @Override
    public Cola clone() {
        Cola clon = new Cola();

        // Si la cola original no está vacía
        if (!this.esVacia()) {
            // Se copian nodos uno a uno
            clon.frente = new Nodo(this.frente.getElem(), null);

            // 'aux' recorre la cola original, 'auxClon' construye la copia
            Nodo aux = this.frente;
            Nodo auxClon = clon.frente;

            while (aux.getEnlace() != null) {
                // Crear el siguiente nodo del clon con el valor del siguiente de 'aux'
                Nodo sig = new Nodo(aux.getEnlace().getElem(), null);
                auxClon.setEnlace(sig);

                // Avanzamos
                auxClon = auxClon.getEnlace();
                aux = aux.getEnlace();
            }
            // Ajustamos 'fin' para que apunte al último nodo del clon
            clon.fin = auxClon;
            clon.cantidad = this.cantidad;
        }
        return clon;
    }

    /**
     * Devuelve una cadena con el contenido de la cola, en orden.
     *
     * @return String describiendo los elementos de la cola.
     */
    @Override
    public String toString() {
        String cadena = "";

        if (this.esVacia()) {
            cadena = "Cola vacia";
        } else {
            cadena = "[ ";
            Nodo aux = this.frente;

            // Recorremos la cola desde 'frente' hasta 'fin'
            while (aux != null) {
                cadena += aux.getElem().toString();
                aux = aux.getEnlace();
                if (aux != null) {
                    cadena += ", ";
                }
            }
            cadena += " ]";
        }
        return cadena;
    }

    /*@Override
    public String toString() {
        if (this.esVacia()) {
            return "Cola vacia";
        }
        StringBuilder sb = new StringBuilder("[ ");
        Nodo aux = this.frente;
        while (aux != null) {
            sb.append(aux.getElem());
            aux = aux.getEnlace();
            if (aux != null) {
                sb.append(", ");
            }
        }
        sb.append(" ]");
        return sb.toString();
    }*/

    /**
     * Realiza un clon de la cola mediante una función recursiva auxiliar.
     *
     * @return Nueva cola clonada.
     */
    public Cola cloneRec() {
        Cola clon = new Cola();

        // Si la cola no está vacía, se inicia la copia
        if (!this.esVacia()) {
            // Se crea el primer nodo para la cola clon
            Nodo aux = this.frente;
            clon.frente = new Nodo(aux.getElem(), null);
            clon.cantidad++;
            Nodo auxClon = clon.frente;

            // Llamada al método recursivo
            pasoClonRec(clon, aux, auxClon);
            //clon.cantidad = this.cantidad;
        }

        return clon;
    }

    /**
     * Método recursivo auxiliar para clonar los nodos restantes de la cola.
     *
     * @param clon la cola que estamos construyendo
     * @param aux nodo actual de la cola original
     * @param auxClon nodo correspondiente en la cola clon
     */
    private void pasoClonRec(Cola clon, Nodo aux, Nodo auxClon) {
        // Pasamos al siguiente nodo en la cola original
        aux = aux.getEnlace();

        // Caso base: si llegamos al final (aux == null), ajustamos 'fin' en la cola clon
        if (aux == null) {
            clon.fin = auxClon;
        } else {
            // Creamos un nuevo nodo con el elemento del nodo 'aux'
            Nodo nuevo = new Nodo(aux.getElem(), null);
            clon.cantidad++;

            // Enlazamos 'auxClon' con este nuevo nodo
            auxClon.setEnlace(nuevo);

            // Avanzamos para clonar el siguiente
            auxClon = nuevo;
            pasoClonRec(clon, aux, auxClon);
        }
    }
}
