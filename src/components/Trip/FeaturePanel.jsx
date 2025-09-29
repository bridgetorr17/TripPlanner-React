import FeatureHeader from "./FeatureHeader"

const FeaturePanel = ({
    userStatus,
    toggleEdit,
    editFeature,
    setEditFeature,
    headerTitle,
    children
}) => {
    return (
        <section className="bg-white border border-sky-200 rounded-lg shadow-md p-6 space-y-4">
            {(userStatus !== 'viewer') && <FeatureHeader 
                headerTitle={headerTitle}                      
                modifyText={editFeature ? "Cancel" : "Add"}
                onToggleEdit={() => 
                    toggleEdit(
                        editFeature, 
                        setEditFeature
                        )
                    }
                />}
                {children}
        </section>
    )
}

export { FeaturePanel as default }