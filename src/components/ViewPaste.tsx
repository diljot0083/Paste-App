import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";

interface PasteItem {
    title: string;
    value: string;
    createdAt: string;
    pasteId: string;
    _id: string;
}

const ViewPaste = () => {
    
    const {id} = useParams();
    const allPastes = useSelector((state: any) => state.paste.pastes);

    const paste = allPastes.filter((p : PasteItem) => p._id === id)[0];

    return(

        <div>
            <div className="flex flex-row gap-7 place-content-between">

                <input className="p-2 rounded-2xl mt-2 w-[60%] pl-4"
                    type="text"
                    placeholder="Enter Your Title"
                    value={paste.title}
                    disabled
                />

            </div>

            <div className="mt-8">
                <textarea
                    className="rounded-2xl mt-4, min-w-[500px] p-4"
                    placeholder="Enter Content"
                    value={paste.value}
                    disabled
                    rows={20}
                />
            </div>

        </div>

    )
}
export default ViewPaste