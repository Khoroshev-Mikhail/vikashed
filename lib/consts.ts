export const FORMATS = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'link',
    'image',    
    'align',   
    'color',
    'background',
];

export const MODULES = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],   
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],    
        ['link', 'image', 'video'],  
    ],
};
