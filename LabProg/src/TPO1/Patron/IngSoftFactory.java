package TPO1.Patron;

/**
 *
 * @author gnzlz
 */
public class IngSoftFactory implements MateriaFactory{
    // Clase Factory concreta
    
    // Redefine constructor definido en la interfaz padre MateriaFactory
    @Override
    public Materia crearMateria(){
        return new M_IngSoft();
    }
    
    @Override
    public Materia crearMateria(String nombre, String prof){
        Materia m = new M_IngSoft();
        m.setNombre(nombre);
        m.setProfesor(prof);
        
        return m;
    }
}
