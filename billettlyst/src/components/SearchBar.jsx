export default function SearchBar({search, setSearch}){
    return(
        <>
        <input
        type="text"
        placeholder="Søk..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}>
        </input>
        </>
    );
}