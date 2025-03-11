import { useState } from "react";
import { useMutation, gql } from "@apollo/client"; // Importing necessary hooks and gql

// Define the GraphQL mutation to add a puppy
const MUTATION_ADD_PUPPY = gql`
  mutation AddPuppy($name: String!, $breed: String!, $imageUrl: String!) {
    addPuppy(name: $name, breed: $breed, imageUrl: $imageUrl) {
      id
      name
      breed
      imageUrl
    }
  }
`;

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  // Apollo Client's useMutation hook for the GraphQL mutation
  const [addPuppy, { loading, error }] = useMutation(MUTATION_ADD_PUPPY);

  // Handle form submission to add a puppy
  function postPuppy(event) {
    event.preventDefault();

    // Placeholder image URL for puppy
    const imageUrl = "https://loremflickr.com/200/300/dog";

    // Execute the mutation
    addPuppy({
      variables: {
        name,
        breed,
        imageUrl, // Passing the puppy's image URL
      },
    }).catch((err) => console.error("Error adding puppy:", err));
  }

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button type="submit">Add to Roster</button>
        {loading && <output>Uploading puppy information...</output>}
        {error && <output>{error.message}</output>}
      </form>
    </>
  );
}
