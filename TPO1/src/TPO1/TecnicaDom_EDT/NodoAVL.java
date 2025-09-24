/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom_EDT;

/**
 *
 * @author santt
 */
public class NodoAVL {
    // Atributos:
    // 'elemento' es el valor que guarda este nodo, debe ser Comparable para poder compararse en el árbol AVL.
    // 'izquierdo' y 'derecho' apuntan a los subárboles hijo izquierdo e hijo derecho respectivamente.
    // 'altura' se usa en el AVL para mantener equilibrado el árbol.
    private Comparable elemento;
    private NodoAVL izquierdo;
    private NodoAVL derecho;
    private int altura;

    /**
     * Constructor del NodoAVL.
     * @param elem      Elemento Comparable que se guarda en este nodo.
     * @param izquierdo Referencia (puntero) al nodo hijo izquierdo.
     * @param derecho   Referencia (puntero) al nodo hijo derecho.
     */
    public NodoAVL(Comparable elem, NodoAVL izquierdo, NodoAVL derecho){
        this.elemento = elem;
        this.izquierdo = izquierdo;
        this.derecho = derecho;
        this.altura = 0;
    }

    /**
     * Modifica el elemento que guarda este nodo.
     * @param argElemento Nuevo elemento (Comparable).
     */
    public void setElemento(Comparable argElemento){
        this.elemento = argElemento;
    }

    /**
     * Devuelve el elemento Comparable guardado en este nodo.
     * @return elemento (Comparable).
     */
    public Comparable getElemento(){
        return this.elemento;
    }

    /**
     * Devuelve la altura de este nodo en el contexto del árbol AVL.
     * @return la altura del nodo.
     */
    public int getAltura(){
        return this.altura;
    }

    /**
     * Recalcula la altura del nodo en base a la altura de sus hijos.
     * Se toma la mayor de las alturas de los hijos y se suma 1.
     */
    public void recalcularAltura(){
        int alturaDerecho = (this.derecho == null)? -1 : this.derecho.getAltura();
        int alturaIzquierdo = (this.izquierdo == null)? -1 : this.izquierdo.getAltura();
        this.altura = Math.max(alturaIzquierdo, alturaDerecho) + 1;
    }

    /**
     * Setea la referencia al nodo hijo izquierdo.
     * @param argNodoIzquierdo Nuevo hijo izquierdo.
     */
    public void setIzquierdo(NodoAVL argNodoIzquierdo){
        this.izquierdo = argNodoIzquierdo;
    }

    /**
     * Devuelve el nodo hijo izquierdo.
     * @return hijo izquierdo (NodoAVL).
     */
    public NodoAVL getIzquierdo(){
        return this.izquierdo;
    }

    /**
     * Setea la referencia al nodo hijo derecho.
     * @param argNodoDerecho Nuevo hijo derecho.
     */
    public void setDerecho(NodoAVL argNodoDerecho){
        this.derecho = argNodoDerecho;
    }

    /**
     * Devuelve el nodo hijo derecho.
     * @return hijo derecho (NodoAVL).
     */
    public NodoAVL getDerecho(){
        return this.derecho;
    }
}
