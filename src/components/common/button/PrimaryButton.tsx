
type PrimaryButtonProps = {
    text: string;
    props?: any;
}


export default function PrimaryButton(
    { text, ...props }: PrimaryButtonProps
) {
    return (
        <>
            <div className="relative z-10 w-full h-full">
                <button className="w-full max-w-80 text-sm bg-step-1 py-3 px-10 text-center border border-black font-bold rounded-xl hover:translate-x-0.5 hover:translate-y-0.5 transform transition-all duration-500" {...props}>
                    {text}
                </button>
                <div className="w-full max-w-80 h-full absolute bg-black top-1.5 left-1.5 rounded-xl -z-10"></div>
            </div>
        </>
    )
}

