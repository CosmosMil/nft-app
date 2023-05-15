import React, { useState, ChangeEvent, FormEvent, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

type Props = {}

const Collection = (props: Props) => {

  const { user } = useContext(AuthContext);

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {

      const submitFiles = new FormData();
      submitFiles.append("owner", user._id)
      files.forEach((file, index) => {
        submitFiles.append('files', file);

      });

      const requestOptions = {
        method: 'POST',
        body: submitFiles,
      };
      try {
        const response = await fetch("http://localhost:5001/api/nfts/collection", requestOptions);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log('error', error);
      }
    }
  }


  // return (
  //   <div className="p-4 sm:ml-60">
  //     <div className='grid grid-rows-2'>
  //       <div className='flex items center justify-center'>
  //         <h1 className="text-5xl text-indigo-500 animate-pulse font-serif p-5">COLLECTION</h1>
  //       </div>
  //       <div className='flex justify-center items-center p-8'>
  //         <form onSubmit={handleSubmit}>
  //           <input className='' type="file" width="48" height="48" multiple onChange={handleFileChange} />
  //           <div className='p-5'>
  //             <button type="submit">Submit</button></div>
  //         </form>

  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="p-4 sm:ml-60">
      <h1 className="text-5xl text-center text-indigo-500 animate-pulse font-serif p-5">COLLECTION</h1>

      <div className="flex justify-center w-full mx-auto sm:max-w-lg">

        <div className="flex flex-col items-center justify-center my-20 bg-indigo-500 sm:w-3/4 rounded-lg">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl text-slate-600">UPLOAD YOUR NFTS</h2>
            <p className="text-xs">File should be of format .jpg, .jpeg, .tiff or .mp3</p>
          </div>
          <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className="relative w-4/5 max-w-xs ">
              <input className='rounded' type="file" id="file-upload"
                multiple onChange={handleFileChange}>

              </input>
              <div className='flex justify-end p-5'>
                <button type="submit" className='rounded p-2 border-2 border-slate-600 text-slate-600'>Submit</button></div>
            </form>
          </div>



        </div>
      </div>
    </div>

  )
}


export default Collection