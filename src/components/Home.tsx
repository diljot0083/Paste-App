import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

interface PasteItem {
    title: string;
    value: string;
    createdAt: string;
    pasteId: string;
    _id: string;
}

const Home = () => {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state: any) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p: PasteItem) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.value);
        }
    }, [pasteId])

    function createPaste() {

        const paste = {
            title: title,
            value: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            //Updated
            dispatch(updateToPastes(paste));
        }
        else {
            //Create
            dispatch(addToPastes(paste));
        }

        // After Creation or Updation

        setTitle('');
        setValue('');
        setSearchParams({});

    }

    return (
        <div>
            <div className="flex flex-row gap-7 place-content-between">

                <input className="p-2 rounded-2xl mt-2 w-[60%] pl-4"
                    type="text"
                    placeholder="Enter Your Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button>

            </div>

            <div className="mt-8">
                <textarea
                    className="rounded-2xl mt-4, min-w-[500px] p-4"
                    placeholder="Enter Content"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>

        </div>
    )
}
export default Home