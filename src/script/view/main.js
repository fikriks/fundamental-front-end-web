function main() {
    $(document).ready(function () {
        const getQuran = () => {
            fetch(`https://al-quran-8d642.firebaseio.com/data.json?print=pretty`)
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    renderAllQuran(responseJson);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        const getQuranDetail = (nomer) => {
            Promise.all([
                    fetch(`https://al-quran-8d642.firebaseio.com/data.json?print=pretty`).then(response => response.json()),
                    fetch(`https://al-quran-8d642.firebaseio.com/surat/${nomer}.json?print=pretty`).then(response => response.json())
                ])
                .then(response => {
                    return [response[0][nomer - 1].nama, response[1]];
                })
                .then(responseJson => {
                    showQuranDetail(responseJson);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        const renderAllQuran = (qurans) => {
            let a = `<div class="table-responsive">
            <table id="example" class="table table-hover">
            <thead>
            <tr>
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">Ayat</th>
            <th scope="col">Arti</th>
            <th scope="col">Type</th>
            <th scope="col">Aksi</th>
            </tr>
            </thead>
            <tbody>`;

            qurans.forEach(quran => {
                a += `
                <tr>
                <th scope="row">${quran.nomor}</th>
                <td>${quran.nama}</td>
                <td>${quran.ayat}</td>
                <td>${quran.arti}</td>
                <td>${quran.type.charAt(0).toUpperCase() + quran.type.slice(1)}</td>
                <td><button class="btn btn-success button-detail" type="button" id="${quran.nomor}" data-toggle="modal" data-target="#exampleModal">Lihat Surat</button></td>
                </tr>
                `;
            });

            a += `</tbody>
            </table>
            </div>`;

            $('#Quranlist').html(a);

            $('#example').DataTable({
                "paging": false,
                "info": false
            });

            const buttons = document.querySelectorAll(".button-detail");
            buttons.forEach(button => {
                $(button).click(event => {
                    getQuranDetail(event.target.id);
                })
            })

        }

        const showQuranDetail = (details) => {
            let a = "";

            details[1].forEach(detail => {
                a += `
                <div class="isi-modal">
                <span class="border border-primary rounded-circle p-2">${detail.nomor}</span>
                <div class="col-md-12 text-center">
                
                <h4>${detail.ar}</h4>
                <br>
                <small>${detail.tr}</small>
                <br>
                <span class="font-weight-normal">${detail.id}</span>
                <hr my="4">
                </div>
                </div>`;
            })
            $('.modal-title').html(details[0]);
            $('.modal-body').html(a);
        }

        getQuran();

        $('.close').click(function () {
            $('.modal-title').html('');
            $('.modal-body').html(` <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>`);
        })

        $('.btn-tutup').click(function () {
            $('.modal-title').html('');
            $('.modal-body').html(` <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>`);
        })
    });
}

export default main;