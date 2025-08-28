/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package TPO1.TecnicaDom;

import TPO1.TecnicaDom_EDT.NodoAVL;
import java.util.concurrent.RecursiveTask;
//import java.util.concurrent.atomic.AtomicBoolean;

import java.util.concurrent.locks.Lock;
import TPO1.utiles.Resultado;

/**
 *
 * @author G16
 */
public class BusquedaParalela extends RecursiveTask<Boolean> {

    private final NodoAVL nodo;
    private final Comparable elemento;
    private final int threshold;
    private final Resultado encontrado;
    private final Lock cerrojo;
    //private final AtomicBoolean encontrado;

    //public BusquedaParalela(NodoAVL nodo, Comparable elemento, int threshold, AtomicBoolean encontrado) {
    public BusquedaParalela(NodoAVL nodo, Comparable elemento, int threshold, Resultado encontrado, Lock cerrojo) {
        this.nodo = nodo;
        this.elemento = elemento;
        this.threshold = threshold;
        this.encontrado = encontrado;
        this.cerrojo = cerrojo;
    }

    //private boolean busquedaSecuencial(NodoAVL nodo, Comparable elemento, AtomicBoolean encontrado) {
    private boolean busquedaSecuencial(NodoAVL nodo, Comparable elemento, Resultado encontrado) {
        boolean resultado = false;
        if (nodo != null && !encontrado.get()) {
            if (nodo.getElemento().equals(elemento)) {
                System.out.println("Elemento encontrado por el hilo: " + Thread.currentThread().getName());
                encontrado.set(true);
                resultado = true;
                System.out.println("El alumno es: " + nodo.getElemento().toString());
                cerrojo.lock();
                try {
                    System.out.println("Elemento encontrado por el hilo: " + Thread.currentThread().getName());
                    encontrado.set(true);
                    resultado = true;
                    System.out.println("El alumno es: " + nodo.getElemento().toString());
                } finally {
                    cerrojo.unlock();
                }
            } else if (!encontrado.get()) {
                // Buscamos primero por el hijo izquierdo
                resultado = busquedaSecuencial(nodo.getIzquierdo(), elemento, encontrado);
                // Si no se encontró, probamos en el derecho
                if (!encontrado.get()) {
                    resultado = busquedaSecuencial(nodo.getDerecho(), elemento, encontrado);
                }
            }
        }
        return resultado;
    }

    @Override
    protected Boolean compute() {
        boolean resultado = false;

        if (nodo != null && !encontrado.get()) {
            System.out.println("Hilo: " + Thread.currentThread().getName() + " procesando nodo: " + nodo.getElemento());

            if (nodo.getAltura() <= threshold) {
                // Si la altura es menor o igual al threshold se realiza una busqueda secuencial
                System.out.println("Cambiando a busqueda secuencial en el hilo: " + Thread.currentThread().getName());
                resultado = busquedaSecuencial(nodo, elemento, encontrado);
            } else {
                // Si la altura supera el threshold, dividir en subtareas
                boolean resultadoIzq;
                boolean resultadoDer;

                BusquedaParalela tareaIzq = new BusquedaParalela(nodo.getIzquierdo(), elemento, threshold, encontrado, cerrojo);
                BusquedaParalela tareaDer = new BusquedaParalela(nodo.getDerecho(), elemento, threshold, encontrado, cerrojo);

                // 1. Lanza la tarea derecha para que otro hilo la procese en paralelo.
                tareaDer.fork();

                // 2. El hilo actual computa la tarea izquierda directamente.
                //    No se queda esperando, se pone a trabajar.
                resultadoIzq = tareaIzq.compute();

                // 3. Espera a que la tarea derecha termine (si no ha terminado ya).
                resultadoDer = tareaDer.join();

                resultado = resultadoIzq || resultadoDer;
            }
        }
        return resultado;
    }
}
