import StartCapture from "../../components/StartCapture/StartCapture";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const IFRAME_END_POINT = import.meta.env.VITE_IFRAME_END_POINT;

export const IframeFlow = () => {
  return (
    <div>
      <h1>IframeFlow</h1>
      <StartCapture
        fetchURL={`${BASE_URL}${IFRAME_END_POINT}`}
        btnTitle="Start Capture"
        iFrame={true}
      />
    </div>
  );
};
