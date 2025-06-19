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
    const navigate = useNavigate();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId: PasteItem) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleView(paste: PasteItem) {
        navigate(`/pastes/${paste._id}`);
    }

    return (
        <div className="p-2 md:p-4 max-w-full overflow-x-hidden">
            <input
                className="p-2 pl-4 rounded-2xl w-full max-w-[300px] md:max-w-[600px] mt-2 md:mt-5"
                type="search"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="border p-3 md:p-6 mt-8 md:mt-10 rounded-md w-full">
                <h2 className="text-lg md:text-xl font-semibold mb-5">All Pastes</h2>

                <div className="flex flex-col gap-5">
                    {filteredData.length > 0 &&
                        filteredData.map((paste) => (
                            <div className="border p-3 md:p-4 rounded-md" key={paste._id}>
                                <div className="font-medium text-base md:text-lg">{paste.title}</div>

                                <div className="mt-2 text-sm md:text-base">{paste.value}</div>

                                <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-evenly mt-4 text-sm md:text-base">
                                    <button
                                        className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-gray-200"
                                        onClick={() => navigate(`/?pasteId=${paste._id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-gray-200"
                                        onClick={() => handleView(paste)}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-gray-200"
                                        onClick={() => handleDelete(paste)}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-gray-200"
                                        onClick={() => {
                                            navigator.clipboard.writeText(paste.value);
                                            toast.success("Copied to Clipboard");
                                        }}
                                    >
                                        Copy
                                    </button>

                                    <button
                                        className="px-2 py-1 md:px-3 md:py-1.5 rounded-md bg-gray-200"
                                        onClick={() => {
                                            const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                                            navigator.clipboard.writeText(shareUrl);
                                            toast.success("Link copied to clipboard!");
                                        }}
                                    >
                                        Share
                                    </button>
                                </div>

                                <div className="text-xs md:text-sm text-gray-500 mt-2">
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
