import chromadb
from chromadb.config import Settings
import os

# Initialize in-memory / local persistent Chroma database
CHROMA_DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "chroma_data")

chroma_client = chromadb.PersistentClient(path=CHROMA_DB_PATH)

def get_vector_collection(collection_name: str = "resumes"):
    """
    Retrieves or creates a collection for storing text chunks and embeddings.
    """
    return chroma_client.get_or_create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"} # Use cosine similarity
    )

def store_resume_chunks(user_id: int, text_chunks: list[str]):
    """
    Quick helper for inserting resume chunks.
    """
    collection = get_vector_collection("resumes")
    # IDs need to be unique strings
    ids = [f"user_{user_id}_chunk_{i}" for i in range(len(text_chunks))]
    metadatas = [{"user_id": user_id} for _ in range(len(text_chunks))]
    
    # Let Chroma DB handle the default embedding function (usually all-MiniLM-L6-v2) 
    # unless sentence-transformers is strictly specified to run manually.
    collection.add(
        documents=text_chunks,
        metadatas=metadatas, # type: ignore
        ids=ids
    )

def query_resume_context(user_id: int, query: str, n_results: int = 3):
    collection = get_vector_collection("resumes")
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={"user_id": user_id}
    )
    return results
