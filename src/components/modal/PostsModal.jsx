const PostModal = ({ _data, _submit, _onChange, _close, _categories }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-primary-dark/70 dark:bg-primary/70 max-sm:overflow-scroll">
            <div className="bg-primary dark:bg-primary-dark border rounded-lg p-5 lg:w-11/12">
                <form className="grid lg:grid-cols-12 gap-4" onChange={_onChange} onSubmit={_submit}>
                    <label className="lg:col-span-3 lg:row-span-3 relative rounded-lg overflow-hidden group">
                        <img src={_data?.image} className="w-full aspect-square object-cover border rounded-lg" alt={_data?.title} />
                        <div className="absolute inset-0 opacity-0 hover:opacity-70 bg-primary dark:bg-primary-dark group-hover:opacity-70 flex justify-center items-center">
                            <p className="text-2xl">Change Image</p>
                        </div>
                        <input type="file" name="image" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 rounded-lg opacity-0 cursor-pointer" />
                    </label>
                    <label className="lg:col-span-9">
                        Title
                        <input type="text" name="title" defaultValue={_data?.title} />
                    </label>
                    <label className="lg:col-span-4">
                        Category
                        <select className="w-full" name="categoryId" defaultValue={_data?.categoryId}>
                            {_categories?.map((category, index) => (
                                <option key={index} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </label>
                    <label className="lg:col-span-5">
                        Cordinates
                        <input type="text" name="googleMapsCoordinates" defaultValue={_data?.googleMapsCoordinates} />
                    </label>
                    <label className="lg:col-span-9">
                        Content
                        <textarea name="content" defaultValue={_data?.content} rows={8}></textarea>
                    </label>
                    <button type="submit" className="lg:col-span-11 bg-blue-500 p-3 px-6 border rounded-lg text-text dark:text-text-dark hover:text-text-dark hover:dark:text-text">Submit</button>
                    <button type="button" className="lg:col-span-1 bg-red-500 p-3 px-6 border rounded-lg text-text dark:text-text-dark hover:text-text-dark hover:dark:text-text" onClick={_close}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default PostModal;