export default function StaticPage({ params }: { params: { page: string } }) {
  return (
    <div className=" flex flex-col ">
      <div className=" text-gray-200 font-semibold text-4xl md:text-7xl lg:text-9xl mb-4 text-center lg:text-left capitalize">
        {params.page}
      </div>
    </div>
  );
}
