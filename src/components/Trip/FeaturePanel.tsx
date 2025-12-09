import FeatureHeader from "./FeatureHeader"
import { ToggleEditArgs } from "pages/TripPage";

interface FeaturePanelProps {
    userStatus: 'owner' | 'viewer' | 'contributor';
    toggleEdit: (args: ToggleEditArgs) => void;
    editFeature: boolean;
    setEditFeature: React.Dispatch<React.SetStateAction<boolean>>;
    headerTitle: string;
    children: React.ReactNode
}

const FeaturePanel = ({
    userStatus,
    toggleEdit,
    editFeature,
    setEditFeature,
    headerTitle,
    children
}: FeaturePanelProps) => {
    return (
        <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
            {(userStatus !== 'viewer') && <FeatureHeader 
                headerTitle={headerTitle}                      
                modifyText={editFeature ? "Cancel" : "Add"}
                onToggleEdit={() => 
                    toggleEdit({
                        edit: editFeature, 
                        setEdit: setEditFeature
                        })
                    }
                />}
                {children}
        </section>
    )
}

export { FeaturePanel as default }