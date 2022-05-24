
import { FormEvent, useEffect, useState } from "react"
import * as C from "./App.styles"
import { PhotoItem } from "./components/PhotoItem"
import * as Photos from './services/photos'
import { Photo } from "./types/Photo"

export const App = () => {
  const [ loading, setLoading ] = useState(false);
  const [ uploading, setUploading ] = useState(false);

  const [ photos, setPhotos ] = useState<Photo[]>([])

  useEffect(() => {
    getPhotos();
  }, [])

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await Photos.getAll());
    setLoading(false);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0){
      setUploading(true);
      let result = await Photos.uploadFile(file);
      setUploading(false);

      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [ ...photos ];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  const handleDeleteImage = async (item:Photo) => {
    const { name } = item;
    let response = await Photos.deleteFile(name);

    function removeArrayItem(array : Photo[], item:Photo){

      return array.filter(function(itens){
        return itens !== item;
      })
    }

    if(response === true){
      let newPhotoList = removeArrayItem(photos, item);
      return setPhotos(newPhotoList);
    }

    return alert("Erro ao excluir " + name);
  }


  return(
    <C.Container>
      <C.Area>
        <C.Header>
          <h1>Estoque de fotos!</h1>
        </C.Header>

        

        <C.UploadForm method="POST" onSubmit={(e) => handleFormSubmit(e)}>
          {
            !uploading && <span>
              <input type="file" name="image" />
              <input type="submit" value="Enviar"  />
            </span>
          }

          {
            uploading && <b>Enviando...</b>

          }
        </C.UploadForm>

        <C.Text>
          <p>Clique duas vezes em cima da <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-trash3-fill deleteSVG" viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg> para deletar a foto!</p>
        </C.Text>

        { loading && 
          <C.LoadingScreen>
            Carregando!
          </C.LoadingScreen> 
        }
        
        { photos.length === 0 && !loading && <h1>Sem fotos :(</h1> }

        { !loading && photos.length > 0 &&

            <C.PhotoList>
              { photos.map((item, index) => (
                <PhotoItem key={index} item={item} handleDeleteImage={handleDeleteImage} />
              )) }
            </C.PhotoList>

        }

      </C.Area>
    </C.Container>
  )
}