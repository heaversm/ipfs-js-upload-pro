import { useState, useEffect } from "react";
import useIpfsFactory from "./hooks/use-ipfs-factory.js";
import useIpfs from "./hooks/use-ipfs.js";
import mozillaLogo from "./assets/img/logo-mozilla.jpg";
import "./App.css";

const toBuffer = require("it-to-buffer");

function App() {
  const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ["id"] });
  const id = useIpfs(ipfs, "id");
  const [version, setVersion] = useState(null);
  const [file, setFile] = useState(null);
  const [ipfsID, setIpfsID] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [fileContents,setFileContents] = useState(null);

  const IPFS_BASE_URL = 'https://ipfs.io/ipfs/';

  useEffect(() => {
    if (!ipfs) return;

    const getVersion = async () => {
      const nodeId = await ipfs.version();
      setVersion(nodeId);
    };

    getVersion();
  }, [ipfs]);

  useEffect(() => {
    if (ipfs) {
      const uploadFile = async () => {
        const addResult = await ipfs.add(file);
        console.log(addResult);
        const { path, size } = addResult;
        setIpfsID({ path, size });
      };
      uploadFile();
    }
  }, [file,ipfs]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);
    if (files.length === 0) return;
    setFile(files[0]);
  };

  const handleShowContents = (e) => {
    const getBufferedFile = async () => {
      
      if (file.type === "text/plain"){
        const fileURL = `${IPFS_BASE_URL}${ipfsID.path}`;

        fetch(fileURL)
          .then( data => data.text() )
          .then( fileContents => {
              setFileContents(fileContents);
              setImgURL(null);
          } );
      } else {
        const bufferedContents = await toBuffer(ipfs.cat(ipfsID.path));
        const fileBlob = new Blob([bufferedContents], { type: file.type }); //TODO: how to determine filetype
        const fileURL = window.URL.createObjectURL(fileBlob);
        setImgURL(fileURL);
        setFileContents(null);
      }
      
    };
    getBufferedFile();
  };

  return (
    <div className="sans-serif">
      <header className="flex items-center pa3 bg-charcoal bb bw3 b--red-muted">
        <img
          alt="Mozilla logo"
          src={mozillaLogo}
          style={{ height: 50 }}
          className="v-top"
        />
        <h1 className="flex-auto ma0 tr f3 fw2 montserrat white">
          Decentralized File Storage
        </h1>
      </header>
      <main>
        {ipfsInitError && (
          <div className="bg-red pa3 mw7 center mv3 white">
            Error: {ipfsInitError.message || ipfsInitError}
          </div>
        )}
        {!id && !file && (
          <div className="bg-red pa3 mw7 center mv3 white">
            Instantiating IPFS...
          </div>
        )}
        {(id || version) && (
          <section className="bg-snow pa3 mw7 center mv3">
            <h1
              className="f3 fw4 ma0 pt3 charcoal montserrat tc"
              data-test="title"
            >
              Upload File
            </h1>
            <p className="tc">(accepts images or txt)</p>
            <div className="flex flex-column items-center">
              <input
                type="file"
                className="w-80 tc ba b--charcoal br3 pa2"
                onChange={(e) => handleFileChange(e)}
                accept="jpg,png,gif,txt"
              />
            </div>
          </section>
        )}
        {ipfsID && (
          <section className="bg-snow pa3 mw7 center mv3">
            <h1
              className="f3 fw4 ma0 pv3 charcoal montserrat tc"
              data-test="title"
            >
              Uploaded File
            </h1>
            <div className="flex flex-column">
              <p>
                <span>IPFS URL: </span> <a href={`${IPFS_BASE_URL}${ipfsID.path}`} target='_blank' rel='noopener noreferrer'>{`${IPFS_BASE_URL}${ipfsID.path}`}</a>
                <br />
                <span>Size: </span> <span>{`${Math.ceil(ipfsID.size/1000)}kb`}</span>
              </p>
            </div>
            <div className="flex flex-column items-center">
              {imgURL && (
                <img src={imgURL} alt="uploaded file" />
              )}
              {fileContents && (
                <p>{fileContents}</p>
              )}
                <button
                  className="get-file f6 link dim br3 ph3 pv2 mv3 mw6 dib white bg-blue"
                  onClick={(e) => {
                    handleShowContents(e);
                  }}
                >
                  Show Contents
                </button>
            </div>
          </section>
        )}

        {(id || version) && (
          <section className="bg-snow mw7 center mt5">
            <h1
              className="f3 fw4 ma0 pv3 charcoal montserrat tc"
              data-test="title"
            >
              Connected to IPFS
            </h1>
            <div className="pa4">
              {id && <IpfsId obj={id} keys={["id", "agentVersion"]} />}
              {version && <IpfsId obj={version} keys={["version"]} />}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const Title = ({ children }) => {
  return <h2 className="f5 ma0 pb2 charcoal fw4 montserrat">{children}</h2>;
};

const IpfsId = ({ keys, obj }) => {
  if (!obj || !keys || keys.length === 0) return null;
  return (
    <>
      {keys?.map((key) => (
        <div className="mb4" key={key}>
          <Title>{key}</Title>
          <div className="bg-white pa2 br2 truncate monospace" data-test={key}>
            {obj[key].toString()}
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
