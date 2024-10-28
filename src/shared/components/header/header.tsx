type HeaderProps = {
    title: string
}

const Header = (props: HeaderProps) => {
    return (
        <div className="w-full bg-custom-blue h-48 rounded-br-[25px] font-bold text-white justify-center items-center flex fpfont-mono text-3xl shadow-md shadow-slate-400 z-[1000] sticky top-0">
            <p className="text-5xl font-extrabold pt-14">{props.title}</p>
        </div>
    )
}

export default Header