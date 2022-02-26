import ReactLoading from "react-loading"

interface LoadingProps {
    message: string
}

export default function Loading({ message }: LoadingProps) {
    return(
        <div>
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <h2>{message}</h2>
                <h2>창을 닫지 말아주세요.</h2>
                <ReactLoading type={"spinningBubbles"} color={"red"} height={'80%'} width={'80%'} />
            </div>
        </div>
    );
}