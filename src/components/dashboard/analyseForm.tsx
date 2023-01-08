import React, { Fragment, useCallback } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useDropzone } from "react-dropzone";
import { uploadTrackToAnalyze } from "../../actions/user";
import { DefaultButton, Icon } from "../widgets";
import Progressbar from "../widgets/progressbar";
export const AnalyseForm: React.FC<any> = (props) => {
    const {
        analyzeFile = null,
        uploadedFile = null,
        uploadedFileDiv = "",
        setUploadedFileDiv,
        loading = false,
        setAnalyzeFile,
        setUploadedFile,
        handleAnalyze,
        setTabMenu,
        setLoading,
    } = props.data;

    const onDrop = useCallback((acceptedFiles: any[]) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                setTabMenu("analyze");
                setLoading("analyze");
                uploadTrackToAnalyze(file).then((data: any) => {
                    setLoading("");
                    setUploadedFile(data.data);
                });
            };
            reader.readAsDataURL(file);
            setAnalyzeFile(file);
            return file;
        });

    }, [setAnalyzeFile, setLoading, setTabMenu, setUploadedFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mp3': ['.mp3'],
            'audio/wav': ['.wav']
        }
    });

    const handleCloseAnalyseForm = useCallback(() => {
        setUploadedFile(null);
        setAnalyzeFile(null);
        setUploadedFileDiv('')
    }, [setUploadedFile, setAnalyzeFile, setUploadedFileDiv])

    return (
        <Fragment>
            {analyzeFile ? (
                <div
                    className={"file-upload-box text-center drag-active"}
                >
                    <div className="mt-5 mb-3 title">
                        {analyzeFile.name}
                    </div>
                    <div className="mb-3">
                        <ReactAudioPlayer
                            src={URL.createObjectURL(analyzeFile)}
                            // autoPlay
                            controls
                            className=""
                        />
                    </div>
                    {(loading !== "analyze" || (loading === "analyze" && uploadedFile !== null)) && (
                        <div className="d-flex justify-content-center mb-3">
                            <DefaultButton
                                color="var(--color-blue-light)"
                                textColor="white"
                                borderColor="var(--color-blue-light)"
                                className="me-3"
                                onClick={handleCloseAnalyseForm}
                            >
                                Cancel
                            </DefaultButton>
                            <DefaultButton
                                color="var(--color-blue-light)"
                                textColor="white"
                                borderColor="var(--color-blue-light)"
                                disabled={uploadedFileDiv}
                                onClick={handleAnalyze}
                            >
                                {loading === "analyze" ? (
                                    <Icon name='loading' />
                                    ) : (
                                        "Submit"
                                )}
                            </DefaultButton>
                        </div>
                    )}
                    {loading === "analyze" && (
                        <div className="progress-bar">
                            <Progressbar />
                        </div>
                    )}
                    <DefaultButton
                        color="var(--color-blue-light)"
                        textColor="white"
                        borderColor="var(--color-blue-light)"
                        className="close-btn"
                        onClick={handleCloseAnalyseForm}
                    >
                        <Icon name="close" />
                    </DefaultButton>
                </div>
            ) : (
                <div
                    {...getRootProps({ className: "dropzone", accept: "mp3/*" })}
                    className={"focus file-upload-box text-center" + (isDragActive ? " drag-active" : "")}
                >
                    <img src="upload_cloud.svg" alt="upload" />
                    <input
                        className="input-zone"
                        {...getInputProps()}
                    />

                    <p className="dropzone-content">
                        {isDragActive ? "Release to drop the files here" : "Drag your file here"}
                    </p>
                    {/* <DefaultButton
                        color="var(--color-blue-light)"
                        textColor="white"
                        borderColor="var(--color-blue-light)"
                        className="mb-3"
                    >
                        Select file to upload
                    </DefaultButton> */}
                    {/* <DefaultButton
                        color="var(--color-blue-light)"
                        textColor="white"
                        borderColor="var(--color-blue-light)"
                        onClick={handleCloseAnalyseForm}
                        className="close-btn"
                    >
                        <Icon name="close" />
                    </DefaultButton> */}
                </div>
            )}
        </Fragment>
    );
};

export default AnalyseForm;
