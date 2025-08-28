package TPO1.Patron;

/**
 * @author g16
 */

public interface Materia {
    // Clase Producto
    
    // --> No debe llevar constructor porque esa es responsabilidad del Factory <--
    
    // Define todo comportamiento que deben implementar los hijos
    String getNombre();
    String getDpto();
    String getProfesor();
    String getDatos();
    
    void setNombre(String nombre);
    void setProfesor(String profesor);

}
