import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface PasteItem {
    title: string;
    value: string;
    createdAt: string;
    pasteId: string;
    _id: string;
}

const Paste = () => {
    const pastes = useSelector((state: any) => state.paste.pastes as PasteItem[]);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId: PasteItem) {
        dispatch(removeFromPastes(pasteId));
    }

    const navigate = useNavigate();

    function handleView(paste: PasteItem) {
        navigate(`/pastes/${paste._id}`);
    }

    return (
        <div className="p-4">
            <input
                className="p-2 pl-4 rounded-2xl min-w-[600px] mt-5"
                type="search"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="border p-6 mt-10 rounded-md">
                <h2 className="text-xl font-semibold mb-4">All Pastes</h2>

                <div className="flex flex-col gap-5">
                    {filteredData.length > 0 &&
                        filteredData.map((paste) => (
                            <div
                                className="border p-4 rounded-md"
                                key={paste?._id}
                            >
                                <div className="font-medium">{paste.title}</div>

                                <div className="mt-2">{paste.value}</div>

                                <div className="flex flex-row gap-4 justify-evenly mt-4">
                                    <button onClick={() => navigate(`/?pasteId=${paste?._id}`)}>
                                        Edit
                                    </button>

                                    <button onClick={() => handleView(paste)}>View</button>

                                    <button onClick={() => handleDelete(paste)}>Delete</button>

                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(paste.value);
                                            toast.success("Copied to Clipboard");
                                        }}
                                    >
                                        Copy
                                    </button>

                                    <button onClick={() => {
                                        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                                        navigator.clipboard.writeText(shareUrl);
                                        toast.success("Link copied to clipboard!");
                                    }}>Share</button>
                                </div>

                                <div className="text-sm text-white-500 mt-2">
                                    {format(new Date(paste.createdAt), "dd MMM yyyy, hh:mm a")}
                                </div>

                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Paste;
