package TPO1.Patron;

/**
 *
 * @author g16
 */
public interface MateriaFactory {
    // Clase Factory.
    
    // Define el constructor que deben redefinir los Factorys concretos
    Materia crearMateria();
    Materia crearMateria(String nombre, String prof);
}
