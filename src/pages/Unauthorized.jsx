function Unauthorized() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-red-500">403 - Unauthorized</h1>
      <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
    </div>
  );
}

export default Unauthorized;